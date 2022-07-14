import './App.css';
import {BrowserRouter, Switch,Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
      </div>
    </BrowserRouter>
  );
}

export default App;
