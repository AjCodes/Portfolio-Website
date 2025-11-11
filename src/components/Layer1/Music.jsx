import { motion } from 'framer-motion';
import { useState } from 'react';
import ElectricBorder from '@/components/ElectricBorder';

const Music = () => {
  // Mock data - will be replaced with Spotify API later
  const [currentSong] = useState({
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273 4718e2b124f79258be7bc452',
    spotifyUrl: 'https://open.spotify.com/user/1282671995',
    isPlaying: true,
  });

  return (
    <section id="music" className="py-20 px-4 md:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Current Vibe</span>
          </h2>
          <p className="text-gray-400 text-lg">What I'm listening to</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <ElectricBorder
            color="#1DB954"
            speed={1.5}
            chaos={1.2}
            thickness={3}
            style={{ borderRadius: '1.5rem' }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-3xl relative overflow-hidden">
            {/* Spotify green glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />

            {/* Animated background wave */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Album Art */}
              <motion.div
                className="relative group"
                animate={{
                  rotate: currentSong.isPlaying ? [0, 360] : 0,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-green-500/50 shadow-2xl shadow-green-500/20">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl">
                    🎵
                  </div>
                </div>

                {/* Vinyl effect */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-900 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700" />
                </div>

                {/* Playing indicator */}
                {currentSong.isPlaying && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3v14l11-7z" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>

              {/* Song Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                  <span className="text-green-500 font-semibold">Now Playing</span>
                  {currentSong.isPlaying && (
                    <motion.div
                      className="flex gap-1"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-green-500 rounded-full"
                          animate={{
                            height: ['8px', '20px', '8px'],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {currentSong.title}
                </h3>
                <p className="text-xl text-gray-400 mb-4">{currentSong.artist}</p>
                <p className="text-sm text-gray-500 mb-6">{currentSong.album}</p>

                {/* Spotify Link */}
                <motion.a
                  href={currentSong.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Follow on Spotify
                </motion.a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-4 right-4 opacity-10">
              <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;
