import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
