

import { AxiosInstance } from '../../util/AxiosInstance';


export const createCart = async () => {


  //check if cart exists

  const cart = localStorage.getItem('cartId');

  if (cart) {

    console.log('Cart already exists...');
    return;
  }

  // get the token from localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // pass it to the API server as a header

  const cartId = localStorage.getItem('cartId');

  if (cartId) return;

  const URL = '/carts';

  const headers = { 'Authorization': `Bearer ${token}` }


  try {

    const response = await AxiosInstance.post(URL, { userId }, { headers });

    const { id } = response.data;

    localStorage.setItem('cartId', id);

    console.log('Cart created with id: ' + id);

    return response;


  } catch (error) {

    throw error;

  }



}

export const getCart = async () => {

  const id = localStorage.getItem('cartId');

  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` }

  const URL = `/carts/${id}`;

  const cart = await AxiosInstance.get(URL, { headers });

  return cart;

}


export const updateCart = async (existingProducts, productAdded) => {


  const cartId = localStorage.getItem('cartId');

  const URI = `/carts/${cartId}`;

  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` }


  const productIds = [];



  productIds.push(productAdded);

  existingProducts.forEach(product => {

    productIds.push(product.id);
  });


  try {

    const response = await AxiosInstance.put(URI, { productIds }, { headers });
    return response;

  } catch (error) {

    throw error;

  }


}

























