import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { Home } from './components/Home';
import { Forum } from './components/Forum';
import { Questions } from './components/Questions';
import { Footer } from './components/Footer';
import { Question } from './components/Question';
import { Admin } from './components/Admin';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<><Admin/></>}/>
        <Route path='/signup' element={<><Signup/></>}/>
        <Route path='/signin' element={<><Signin/></>}/>
        <Route path="/forum" element={<><Hero/><Menu param={"forum"}/><Forum/><Footer/></>}/>
        <Route path='/question/:question_id' element={<><Hero/><Menu param={"forum"}/><Question/><Footer/></>}/>
        <Route path='/forum/:category_id' element={<><Hero/><Menu param={"forum"}/><Questions/><Footer/></>}/>
        <Route path="/" element={<><Hero/><Menu param={"home"}/><Home/><Footer/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
