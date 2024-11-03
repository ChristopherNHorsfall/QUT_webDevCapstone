import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container} from "react-bootstrap";
//import components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
//import SignInForm from "./Components/SignInForm";
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap CSS
//import { useState } from 'react';
//import pages
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Register from "./Pages/Register";

import { AuthProvider, useAuth  } from "./AuthContext";

function App() {
  const { handleLogin, handleLogout } = useAuth(); 

  return (
    <BrowserRouter>
      <div>
        <Header handleLogout={handleLogout} handleLogin={handleLogin}/>
        <Container fluid style={{ padding: '0' }}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;