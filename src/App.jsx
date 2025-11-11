import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Layer1 from './pages/Layer1';
import Layer2 from './pages/Layer2';
import CustomCursor from './components/shared/CustomCursor';
import LoadingScreen from './components/shared/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

// Create context for loading state
export const LoadingContext = createContext();

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <LoadingContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      <Router>
        <CustomCursor />
        <AnimatePresence mode="wait">
          {isTransitioning && <LoadingScreen key="loading" />}
        </AnimatePresence>
        <Routes>
          <Route path="/" element={<Layer1 />} />
          <Route path="/workspace" element={<Layer2 />} />
        </Routes>
      </Router>
    </LoadingContext.Provider>
  );
}

export default App;
