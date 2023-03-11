import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { Home } from './components/Home';
import { Forum } from './components/Forum';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forum" element={<><Hero/><Menu param={"forum"}/><Forum/></>}/>
        <Route path="/" element={<><Hero/><Menu param={"home"}/><Home/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
