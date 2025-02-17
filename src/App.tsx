import { useEffect, useState } from 'react';
import Main from './parts/Main';
import Header from './parts/Header';
import './App.css';
import { useTranslation } from 'react-i18next';
import { useGlobal } from './GlobalContextHandler';

function App() {

  const { t } = useTranslation();
  const [gameConfig, _] = useGlobal().gameConfig;
  
  useEffect(() => {
    document.title = t(`app.webptitle`);
  }, [gameConfig])

  return (
    <>
      <Main />
    </>
  )
}

export default App;
