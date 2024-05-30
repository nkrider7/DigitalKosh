import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./context/CryptoContext";
import "./index.css";
import  { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:30000,
      
      
    },
    
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
     <CryptoContext>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </BrowserRouter>
     </CryptoContext>
  // </React.StrictMode>
);
