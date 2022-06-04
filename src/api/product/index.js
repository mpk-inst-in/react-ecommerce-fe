
import { AxiosInstance } from '../../util/AxiosInstance';


export const getAllProducts = async () => {


  const URL = "/products";

  return AxiosInstance.get(URL);

}


export const getProductsForCategory = async (id) => {


  const URL = `/categories/${id}/products`;

  return AxiosInstance.get(URL);


}

export const searchProduct = async (searchData) => {


  const URL = '/products';

  return AxiosInstance.get(URL, { params: searchData });



}