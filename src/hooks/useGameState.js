import { createContext } from 'react';
import { LEVELS, BADGES } from '../data/gameData';

export const GameContext = createContext();

export const initialState = {
  screen: 'welcome',
  language: 'none',
  level: 0,
  challengeIndex: 0,
  completedChallenges: [],
  completedLevels: [],
  unlockedBadges: [],
  xp: 0,
  streak: 0,
  lastError: null,
  showCelebration: null,
  lastResult: null,
  sessionId: null,
  lastActivity: Date.now()
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, screen: 'map', language: action.payload, lastActivity: Date.now() };
    case 'SESSION_RESET':
      return { ...initialState, sessionId: action.payload };
    case 'SELECT_LEVEL':
      return { ...state, screen: 'challenge', level: action.payload, challengeIndex: 0 };
    case 'GO_TO_MAP':
      return { ...state, screen: 'map' };
    case 'GO_TO_BADGES':
      return { ...state, screen: 'badges' };
    case 'COMPLETE_CHALLENGE': {
      const challengeId = action.payload.id;
      const alreadyCompleted = state.completedChallenges.includes(challengeId);

      // Only award XP and streak on first completion
      const isBonus = action.payload.noErrors;
      const xpGained = alreadyCompleted ? 0 : 100 + (isBonus ? 50 : 0);
      const newXp = state.xp + xpGained;
      const newStreak = alreadyCompleted ? state.streak : (isBonus ? state.streak + 1 : 0);

      const updatedCompleted = alreadyCompleted
        ? state.completedChallenges
        : [...state.completedChallenges, challengeId];

      const currentLevelObj = LEVELS.find(l => l.id === state.level);
      const isLevelFinished = state.challengeIndex === currentLevelObj.challenges.length - 1;

      let nextCompletedLevels = state.completedLevels;
      if (isLevelFinished && !state.completedLevels.includes(state.level)) {
        nextCompletedLevels = [...state.completedLevels, state.level];
      }

      const tempState = { ...state, xp: newXp, streak: newStreak, completedChallenges: updatedCompleted, completedLevels: nextCompletedLevels };

      // Only check for new badges on first completion (avoid re-unlocking)
      const newlyUnlocked = alreadyCompleted
        ? []
        : BADGES.filter(b => !state.unlockedBadges.includes(b.id) && b.requirement(tempState)).map(b => b.id);

      return {
        ...tempState,
        screen: 'result',
        lastResult: {
            xpGained,
            bonus: isBonus && !alreadyCompleted,
            newBadges: newlyUnlocked,
            levelFinished: isLevelFinished,
            alreadyCompleted   // ← ResultScreen can use this to show a replay message
        },
        unlockedBadges: [...state.unlockedBadges, ...newlyUnlocked],
        showCelebration: newlyUnlocked.length > 0 ? newlyUnlocked[0] : null
      };
    }
    case 'NEXT_CHALLENGE':
      return { ...state, screen: 'challenge', challengeIndex: state.challengeIndex + 1 };
    case 'RESET_CELEBRATION':
      return { ...state, showCelebration: null };
    case 'LOAD_STATE':
        return { ...action.payload, screen: state.screen, lastActivity: Date.now() }; // Keep screen if reloading mid-game
    default:
      return state;
  }
}
