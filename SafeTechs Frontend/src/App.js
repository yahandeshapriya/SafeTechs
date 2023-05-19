import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './components/layout/footer/footer';
import Navigation from './components/layout/navigation/navigation';
import Login from './components/layout/popups/login_user';
import About from './components/routes/about';
import Contact from './components/routes/contact';
import Displayer from './components/routes/displayer';
import Home from './components/routes/home';
import Map from './components/routes/map';
import Profile from './components/routes/profile';
import EventEmitter from './utils/EventEmitter';
import Main from './components/layout/dashboard/main';
import Health from './components/routes/health';

function App() {

  useEffect(() => {
    const onCloseLogPannel = () => {
      swapPannel(true);
      showLogin(!log_panel);
    }
    const onSwapPannel = () => {
      swapPannel(!swap_pannel);
    }

    const onRegisterPanel = () => {
      swapPannel(false);
      showLogin(!log_panel);
    }


    const listner = EventEmitter.addListener("closePannel", onCloseLogPannel);
    const listner2 = EventEmitter.addListener("swapPannel", onSwapPannel);

    const listner5 = EventEmitter.addListener("loginpopup", onCloseLogPannel);
    const listner6 = EventEmitter.addListener("registerpopup", onRegisterPanel);

    

    return () => {
      listner.remove();
      listner2.remove();
      listner5.remove();
      listner6.remove();
    }
  })

  const [log_panel, showLogin] = useState(false);

  const [swap_pannel, swapPannel] = useState(true);

  return (
    <div className="App">
      
      <Router>
        <Navigation/>
        {
          log_panel?<Login formSwap={swap_pannel}/>:<></>
        }
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='dashboard' exact element={<Main/>}>

          </Route>
          <Route path='map' exact element={<Map/>}/>
          <Route path='items' exact element={<Displayer/>}/>
          <Route path='contact' exact element={<Contact/>}/>
          <Route path='about' exact element={<About/>}/>
          <Route path='profile' element={<Profile/>}>
            <Route path={'user'} index element={<Health/>}/>
            <Route path={'health'} exact element={<Health/>}/>
          </Route>
          {/* <Route path='/**' /> */}
        </Routes>
        <Footer/>
      </Router>
      
      
      
      
    </div>
  );
}

export default App;
