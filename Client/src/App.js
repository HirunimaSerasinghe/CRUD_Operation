import './App.css';
import {BrowserRouter, Switch,Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home'
import AddNewRecord from './Pages/AddNewRecord'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route exact path ="/" element={<AddNewRecord/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
