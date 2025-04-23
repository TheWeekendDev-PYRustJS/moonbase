import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './assets/fonts/fonts.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tour from "./pages/Tour";
import Contact from "./pages/Contact";
import Thankyou from "./pages/Thankyou";
import "./styles.css";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </Router>
  );
}

export default App;