import './App.css';
import Portfolio from './pages/main';
import ArtworkProcessPage from './pages/process';
import AboutTheArtistPage from './pages/aboutArtist';
import ContactPage from './pages/contact';
import PortfolioItemDetails from './pages/artworkDetails';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderConfirmation from './pages/orderConfirmation';
import OrderFailure from './pages/orderFailure';

function App() {

  const stripePromise = loadStripe(process.env.REACT_APP_TEST_STRIPE_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/details/:id" element={<PortfolioItemDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutTheArtistPage />} />
        <Route path="/process" element={<ArtworkProcessPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-failure" element={<OrderFailure />} />
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </Elements>
  );
}

export default App;
