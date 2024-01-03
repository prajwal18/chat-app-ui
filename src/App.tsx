import { ToastContainer } from "react-toastify";
import useFetchSessionFromCookieAndUpdateStore from "./hooks/useFetchSessionFromCookieAndUpdateStore";
import Router from "./router/Router";

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
