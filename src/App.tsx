import React, {useEffect} from 'react';
import { RecoilRoot } from 'recoil';
import AppRouter from './Router';
import GlobalStyle from './asset/style/GlobalStyle';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('tokenExpiresAt');

    if (token && expiresAt && Date.now() > parseInt(expiresAt)) {
      console.log('토큰 만료');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('nickname');
      localStorage.removeItem('profile');
      localStorage.removeItem('tokenExpiresAt');
    }
  }, []);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;