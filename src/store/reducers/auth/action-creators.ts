import { SetAuthAction,  SetUserAction, SetLoadingAction, SetErrorAction, AuthActionEnum } from './types';
import { IUser } from "../../../models/IUser";
import { AppDispatch } from '../..';
import { UserService } from '../../../api/UserService';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
  setIsLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload}),
  setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async() => {
        const response = await UserService.getUsers();;
        const candidate = response.data.find(user => user.username === username && user.password === password);        
        if (candidate) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', `${candidate.username}`);
          dispatch(AuthActionCreators.setUser(candidate));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Credentials are incorrect.'));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000)
      
    } catch (error) {
      dispatch(AuthActionCreators.setError('Login error.'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  }
}