import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GlobalContextHandler from './GlobalContextHandler.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <GlobalContextHandler>
        <App />
      </GlobalContextHandler> 
    </I18nextProvider>,
  </StrictMode>,
)


