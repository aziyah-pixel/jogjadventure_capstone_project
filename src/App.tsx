import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explore from './components/Explore';

function App() {
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

export default App;
