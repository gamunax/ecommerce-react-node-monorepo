import { API } from '../config';

export const signup = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const signin = async (user: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const authenticate = (data: any) => {
  localStorage?.setItem('jwt', JSON.stringify(data));
  return; 
};

export const signout = async (next: any) => {
  try {
    localStorage?.removeItem('jwt');
    next();
    const response = await fetch(`${API}/signout`, { method: 'GET' });
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const isAuthenticated = () => {
  const jwt = JSON.parse(localStorage?.getItem('jwt') as string);
  return !!jwt && jwt;
};
