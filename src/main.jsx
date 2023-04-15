import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { createTheme, ThemeProvider } from "@mui/material"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { store } from "./store"
import { red } from "@mui/material/colors"
import "./index.css"

const theme = createTheme({
  palette: {
    btn1: {
      main: "#fff",
      dark: red[50],
      contrastText: red[400],
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={3000} dense={false} maxSnack={3} hideIconVariant={false}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </StoreProvider>
)
