import Cookies from 'js-cookie';

export const isAuthenticated = (): boolean => {
  const token = Cookies.get('token');
  return !!token;
};

export const login = (token: string) => {
  Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
};

export const logout = () => {
  Cookies.remove('token');
};