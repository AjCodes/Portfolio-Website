import Layer1 from './pages/Layer1';
import { SpotifyProvider } from './context/SpotifyContext';
import { ThemeProvider } from './context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Main App component - renders the portfolio
function App() {
  return (
    <ThemeProvider>
      <SpotifyProvider>
        <div className="relative w-full h-screen overflow-hidden bg-black">
          <Layer1 />
        </div>
      </SpotifyProvider>
    </ThemeProvider>
  );
}

export default App;
