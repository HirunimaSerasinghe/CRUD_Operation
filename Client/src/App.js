import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home'
import AddNewRecord from './Pages/AddNewRecord'
import View from './Pages/View';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route exact path ="/AddNewRecord" element={<AddNewRecord/>}/>
          <Route exact path ="/update/:id" element={<AddNewRecord/>}/>
          <Route exact path ="/View/:id" element={<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
