import './App.css';
import Portfolio from './pages/main';
import ArtworkProcessPage from './pages/process';
import AboutTheArtistPage from './pages/aboutArtist';
import ContactPage from './pages/contact';
import PortfolioItemDetails from './pages/artworkDetails';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/details/:id" element={<PortfolioItemDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutTheArtistPage />} />
        <Route path="/process" element={<ArtworkProcessPage />} />
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
