import { useState, createContext } from 'react';
import Layer1 from './pages/Layer1';
import Layer2 from './pages/Layer2';
import { AnimatePresence } from 'framer-motion';
import { WindowManagerProvider } from './context/WindowManagerContext';
import { SpotifyProvider } from './context/SpotifyContext';

// Create context for loading state
export const LoadingContext = createContext();

function App() {
  const [currentLayer, setCurrentLayer] = useState(1);

  return (
    <WindowManagerProvider>
      <SpotifyProvider>
        <div className="relative w-full h-screen overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            {currentLayer === 1 ? (
              <Layer1 key="layer1" onSwitch={() => setCurrentLayer(2)} />
            ) : (
              <Layer2 key="layer2" onSwitch={() => setCurrentLayer(1)} />
            )}
          </AnimatePresence>
        </div>
      </SpotifyProvider>
    </WindowManagerProvider>
  );
}

export default App;
