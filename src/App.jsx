import React, { useReducer, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameContext, initialState, gameReducer } from './hooks/useGameState';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LevelMapScreen } from './screens/LevelMapScreen';
import { ChallengeScreen } from './screens/ChallengeScreen';
import { ResultScreen } from './screens/ResultScreen';
import { BadgesScreen } from './screens/BadgesScreen';
import { BADGES } from './data/gameData';
import { getOrInitializeSession, isSessionValid } from './utils/session';
import { audioManager } from './utils/audio';
import { AudioController } from './components/AudioController';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize audio
  useEffect(() => {
    audioManager.init();
    
    // Start BGM on first user interaction (standard browser policy)
    const startAudio = () => {
        audioManager.playBGM();
        document.removeEventListener('click', startAudio);
    };
    document.addEventListener('click', startAudio);
  }, []);

  // Session Initialization & Persistence
  useEffect(() => {
    const session = getOrInitializeSession();
    
    const saved = localStorage.getItem('rustquest_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load if it's the same session
        if (parsed.sessionId === session.id) {
            dispatch({ type: 'LOAD_STATE', payload: { ...parsed, sessionId: session.id } });
        } else {
            dispatch({ type: 'SESSION_RESET', payload: session.id });
        }
      } catch (e) {
        console.error("Error loading state", e);
        dispatch({ type: 'SESSION_RESET', payload: session.id });
      }
    } else {
      dispatch({ type: 'SESSION_RESET', payload: session.id });
    }
  }, []);

  useEffect(() => {
    if (state.sessionId) {
        localStorage.setItem('rustquest_state', JSON.stringify(state));
    }
  }, [state]);

  // Session Expiration Watcher
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        const newSession = getOrInitializeSession();
        dispatch({ type: 'SESSION_RESET', payload: newSession.id });
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Badge celebration timer
  useEffect(() => {
    if (state.showCelebration) {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESET_CELEBRATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showCelebration]);

  const renderScreen = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
           key={state.screen}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
           className="w-full flex-grow flex flex-col items-center"
        >
          {(() => {
            switch (state.screen) {
              case 'welcome': return <WelcomeScreen />;
              case 'map': return <LevelMapScreen />;
              case 'challenge': return <ChallengeScreen />;
              case 'result': return <ResultScreen />;
              case 'badges': return <BadgesScreen />;
              default: return <WelcomeScreen />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-[#06060a] text-[#f1f5f9] font-sans selection:bg-[#f97316]/30 overflow-x-hidden">
        <main className="relative min-h-screen flex flex-col">
          {/* Background Accents */}
          <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f97316]/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a855f7]/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex-grow pt-8 pb-20">
            {renderScreen()}
          </div>
        </main>

        {/* Global Celebration Modal */}
        <AnimatePresence>
          {state.showCelebration && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-[#13131a]/80 backdrop-blur-xl border border-[#f97316]/30 p-12 rounded-full shadow-[0_0_100px_rgba(249,115,22,0.2)]">
                <motion.span 
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-8xl block"
                >
                  {BADGES.find(b => b.id === state.showCelebration)?.icon}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AudioController />
      </div>
    </GameContext.Provider>
  );
}

export default App;
