import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { H } from './H';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/h/:username" element={<H/>}/>
        <Route path="/home" element={<h1>1</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
