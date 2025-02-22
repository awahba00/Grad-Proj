import api from './api';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function refreshToken(): Promise<TokenResponse> {
  try {
    const response = await api.post('/api/auth/refresh-token');
    return response;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
}

export function isTokenExpired(): boolean {
  // JWT expiration is handled by HttpOnly cookies
  // This is just a helper for UI state
  const user = localStorage.getItem('user');
  if (!user) return true;
  
  try {
    const { exp } = JSON.parse(user);
    if (!exp) return true;
    
    // Check if token expires in less than 5 minutes
    return Date.now() >= (exp * 1000) - 300000;
  } catch {
    return true;
  }
}