import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container} from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap CSS
//import pages
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";

function App() {
  return (
  <BrowserRouter>
      <div>
        <Header/>
        <Container fluid style={{ padding: '0' }}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Container>
        <Footer/>
      </div>
  </BrowserRouter>
  );
}

export default App;
