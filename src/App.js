import logo from './logo.svg';
import './App.css';
import City from './City';
import Detail from './Detail';
import Etable from './Etable';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import EditDetail from './EditDetail';
import Nav from './Nav';

function App() {
  return (
    <div className="container">
      
      
      
     <BrowserRouter>
     <Routes>  
      <Route path="/" element={<Nav />} />
      <Route path="/details/edit/:empid" element={<EditDetail />} />
      <Route path="/city" element={<City />} />  
      <Route path="/details" element={<Etable />} />
      <Route path="/add/details" element={<Detail />} />
          </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
