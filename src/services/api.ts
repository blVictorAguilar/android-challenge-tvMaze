import {Show} from '../redux/common/types';
import axiosInstance from './axiosConfig';

export const fetchShowsAPI = async (): Promise<Show[]> => {
  try {
    const response = await axiosInstance.get('/shows?page=1');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchShowEpisodes = async (showId: number): Promise<Show[]> => {
  try {
    const response = await axiosInstance.get('/shows/' + showId + '/episodes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

function groupEpisodes(episodes) {
  return episodes.reduce((acc, curr) => {
    const season = curr.season;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(curr);
    return acc;
  }, {});
}

export const getGroupedEpisodes = async (showId: number): Promise<Show[]> => {
  try {
    const episodes = await fetchShowEpisodes(showId);
    return groupEpisodes(episodes);
  } catch (error) {
    throw error;
  }
};

export const searchShowsAPI = async (query: string): Promise<Show[]> => {
  try {
    const response = await axiosInstance.get('/search/shows?q=' + query);
    return response.data;
  } catch (error) {
    throw error;
  }
};
