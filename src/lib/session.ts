const SESSION_STORAGE_KEY = 'greenharvest.session-id';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getSessionId(): string {
  const savedSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (savedSessionId && UUID_PATTERN.test(savedSessionId)) {
    return savedSessionId;
  }

  const sessionId = window.crypto.randomUUID();
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}
