import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login1 from './Pages/Login1';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login1></Login1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
