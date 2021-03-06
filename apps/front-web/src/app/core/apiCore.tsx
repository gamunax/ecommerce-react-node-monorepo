import { API } from '../config';

export const getProducts = async (sortBy: any) => {
  try {
    const response = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
