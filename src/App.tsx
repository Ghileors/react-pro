import { Layout } from 'antd';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';

import './App.css';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

function App() {
  const { setUser, setIsAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username') || ''} as IUser);
      setIsAuth(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Navbar/>
      <Layout.Content>
        <AppRouter/>
      </Layout.Content>
    </Layout>
  );
}

export default App;
