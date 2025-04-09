import React from 'react';
import { RecoilRoot } from 'recoil';
import AppRouter from './Router';
import GlobalStyle from './asset/style/GlobalStyle';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;