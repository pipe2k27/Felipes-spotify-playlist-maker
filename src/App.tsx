import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './screens/SignIn';
import * as Service from './services/index';
import Player from './screens/Player';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const code: string | null = new URLSearchParams(window.location.search).get(
    'code'
  );

  // Some authentication work is misssing like, refreshing token when it expires, or persisting log in
  // after reloads, but as time is limited we just have basic log in

  const authDataWorker = async (body: string) => {
    const res = await Service.getAuthData(body);
    if (!res || res.error) return;
    setAccessToken(res.accessToken);
    navigate('/player');
  };

  useEffect(() => {
    if (code && !accessToken) {
      authDataWorker(code);
    }
    if (code && accessToken) {
      navigate('/player');
    }
    if (!code && !accessToken) {
      navigate('/');
    }
  }, []);

  return (
    <div className='App'>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route
          path='/player'
          element={<Player accessToken={accessToken} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
