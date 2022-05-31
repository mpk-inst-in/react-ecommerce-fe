
import { AxiosInstance } from '../../util/AxiosInstance';


export const getAllCategories = async () => {


  const URL = '/categories';

  try {

    const response = await AxiosInstance.get(URL);

    console.log(response);

    return response;

  } catch (error) {

    throw error;

  }



}