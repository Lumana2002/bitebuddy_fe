/**
 * Retrieves the current authentication token from localStorage
 * This works on the client side only
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    console.warn('getAuthToken called on server side');
    return null;
  }
  return localStorage.getItem('auth_token');
}

/**
 * Sets the authentication token in localStorage
 * @param token The JWT token to store
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

/**
 * Removes the authentication token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}
