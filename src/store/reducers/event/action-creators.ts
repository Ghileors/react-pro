import { EventsActionEnum, SetEventsAction, SetGuestsAction } from './types';
import { IUser } from "../../../models/IUser";
import { IEvent } from '../../../models/IEvent';
import { AppDispatch } from '../..';
import { UserService } from '../../../api/UserService';

export const EventActionCreators = {
  setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventsActionEnum.SET_GUESTS, payload: guests}),
  setEvents: (events: IEvent[]): SetEventsAction => ({type: EventsActionEnum.SET_EVENTS, payload: events}),

  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (error) {
      console.log(error);
    }
  },

  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (error) {
      console.log(error);
    }
  },

  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(event => event.author === username || event.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (error) {
      console.log(error);  
    }
  }

}