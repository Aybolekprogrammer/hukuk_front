import {jwtDecode} from 'jwt-decode';


export const saveToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000; 
    return decoded.exp > now;
  } catch {
    return false;
  }
};
