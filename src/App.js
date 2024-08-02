import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=({type,message})=>{
    setAlert({
      type:type,
      message:message
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const router = createBrowserRouter([
    { path: '/', element: <><Navbar showAlert={showAlert} /><Alert alert={alert}/><div className="container"><Home showAlert={showAlert}/></div></> },
    { path: '/About', element:<><Navbar showAlert={showAlert} /><Alert alert={alert}/><div className="container"><About /></div></> },
    { path: '/Home', element:<><Navbar showAlert={showAlert} /><Alert alert={alert}/><div className="container"><Home showAlert={showAlert}/></div></> },
    { path: '/Login', element: <><Navbar showAlert={showAlert} /><Alert alert={alert}/><div className="container"><Login showAlert={showAlert}/></div></> },
    { path: '/Signup', element: <><Navbar showAlert={showAlert} /><Alert alert={alert}/><div className="container"><Signup showAlert={showAlert}/></div></> }
  ]);
  return (
    <div>
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </div>
  );
}

export default App;
