import Layer1 from './pages/Layer1';
import { SpotifyProvider } from './context/SpotifyContext';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Main App component - renders the portfolio
function App() {
  return (
    <SpotifyProvider>
      <div className="relative min-h-screen w-full bg-[#181818]">
        <Layer1 />
      </div>
    </SpotifyProvider>
  );
}

export default App;
