import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explore from './components/Explore';
import Sigup from './components/AuthFrom'; 

function Home() {
  return (
    <>
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/prambanan.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <Navbar />
        <Hero />
      </div>
      <Explore />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AuthFrom" element={<Sigup />} />
    </Routes>
  );
}

export default App;
