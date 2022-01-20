import { API } from '../config';

export const createCategory = async (userId: string, token: string, category: any) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};