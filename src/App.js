import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
