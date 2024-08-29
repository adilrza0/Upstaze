import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(


    <Provider store={store}>
      <ClerkProvider  publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/profile"
      >
        <App />
      </ClerkProvider>
    </Provider>
   
  
);
