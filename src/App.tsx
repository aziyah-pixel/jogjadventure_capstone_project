import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthForm from './components/AuthForm';
import Destinations from './components/Destination';
import DestinationCard from './components/DestinationCard';
import About from './components/About';
import FAQ from './components/FAQ';

function Home() {
  return (
    <>
        <Navbar />
        <Hero />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AuthForm" element={<AuthForm />} />
      <Route path="/destination/:id" element={<DestinationCard />} />
      <Route path="/destination" element={<Destinations />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />    
    </Routes>
  );
}

export default App;
