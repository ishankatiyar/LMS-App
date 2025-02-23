import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner/> : <>{children} </>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster /> {/* Enables toast notifications (pop-up messages). */}
      </Custom>
    </Provider>
  </StrictMode>
);

// Instead of passing data manually between components, Redux stores it in one place.

// Redux is a state management tool (stores and manages app data).
// Provider connects Redux to React, so components can access global state.

{
  /* <Provider store={appStore}>
📌 What it does:

Wraps the entire app with Redux Provider.
Makes Redux data available to all components inside App.
✅ Example Usage:

If a user logs in, their details are stored in Redux.
Other components (e.g., Navbar) can access the user's name. */
}
