import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthForm from './components/AuthForm';
import DestinationCard from './components/DestinationCard';

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
      <Route path="/destination/:id" element={<DestinationCard />} /> {/* Updated route */}
    </Routes>
  );
}

export default App;
