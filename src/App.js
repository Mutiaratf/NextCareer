import './App.css';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Navbar from './Navbar/Navbar.tsx';
import Index from './Pages/Index.tsx';
import Vacancy from './Pages/Vacancy.tsx';
import Footer from './Footer/Footer.tsx';


function App() {
  return (
     <BrowserRouter>
      <Navbar />
       <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Vacancy" element={<Vacancy />} />

    
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;