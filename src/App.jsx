import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ShopWindow from './components/ShopWindow.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Life from './components/Life.jsx';
import BigIdea from './components/BigIdea.jsx';
import Contact from './components/Contact.jsx';
import PopCard from './components/PopCard.jsx';
import { ToastProvider } from './components/Toast.jsx';

export default function App() {
  return (
    <ToastProvider>
      {/* Gives the line drawings their slightly wobbly, hand-drawn look */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale="2.6" /></filter>
      </svg>
      <Nav />
      <main>
        <Hero />
        <ShopWindow />
        <About />
        <Work />
        <Life />
        <BigIdea />
        <Contact />
      </main>
      <PopCard />
    </ToastProvider>
  );
}
