import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthForm from './components/AuthForm';

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
    </Routes>
  );
}

export default App;
