import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./auth/auth.jsx";
import App from "./App.jsx";

const theme = extendTheme({
  colors: { brand: { 50:"#eef3ff",100:"#dbe6fe",200:"#bfcffd",300:"#93b0fb",400:"#5c86f7",500:"#315ff1",600:"#204ae5",700:"#1b3bba",800:"#193a94",900:"#1a3075" } }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
