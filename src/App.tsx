import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import useFetchSessionFromCookieAndUpdateStore from "./hooks/useFetchSessionFromCookieAndUpdateStore";

function App() {
  useFetchSessionFromCookieAndUpdateStore();

  return (
    <div>
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
