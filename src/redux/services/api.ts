import {Show} from '../common/types';
import axiosInstance from './axiosConfig';

export const fetchShowsAPI = async (): Promise<Show[]> => {
  try {
    const response = await axiosInstance.get('/shows');
    return response.data;
  } catch (error) {
    throw error;
  }
};
