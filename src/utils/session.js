/**
 * Session utility for anonymous session management.
 * Generates unique identifiers and handles expiration using localStorage.
 */

const SESSION_KEY = 'rustquest_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Generates a basic UUID-like string.
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Initializes or retrieves the current session.
 * @returns {Object} The session object { id, expiresAt }
 */
export function getOrInitializeSession() {
  const savedSession = localStorage.getItem(SESSION_KEY);
  const now = Date.now();

  if (savedSession) {
    try {
      const session = JSON.parse(savedSession);
      if (session.expiresAt > now) {
        // Refresh expiration on activity
        session.expiresAt = now + SESSION_DURATION;
        saveSession(session);
        return session;
      }
    } catch (e) {
      console.error("Error parsing session", e);
    }
  }

  // Create new session
  const newSession = {
    id: generateUUID(),
    expiresAt: now + SESSION_DURATION
  };
  saveSession(newSession);
  return newSession;
}

/**
 * Saves the session to localStorage.
 */
function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Validates if the current session is still valid.
 * @returns {boolean}
 */
export function isSessionValid() {
  const savedSession = localStorage.getItem(SESSION_KEY);
  if (!savedSession) return false;
  try {
    const session = JSON.parse(savedSession);
    return session.expiresAt > Date.now();
  } catch (e) {
    return false;
  }
}

/**
 * Clears the session and game state.
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('rustquest_state');
}
