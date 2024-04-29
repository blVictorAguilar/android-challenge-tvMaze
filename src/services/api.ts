import {SearchShowShape, Show} from '../redux/common/types';
import axiosInstance from './axiosConfig';

interface Episode extends Show {
  season: string;
}

type GroupedEpisodes = {[key: string]: Episode[]};

export const fetchShowsAPI = async (page: number): Promise<Show[]> => {
  try {
    const response = await axiosInstance.get(`/shows?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchShowEpisodes = async (showId: number): Promise<Episode[]> => {
  try {
    const response = await axiosInstance.get('/shows/' + showId + '/episodes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

function groupEpisodes(episodes: Episode[]): {} {
  return episodes.reduce((acc, curr) => {
    const season = curr.season;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(curr);
    return acc;
  }, {} as GroupedEpisodes);
}

export const getGroupedEpisodes = async (
  showId: number,
): Promise<GroupedEpisodes> => {
  try {
    const episodes = await fetchShowEpisodes(showId);
    return groupEpisodes(episodes);
  } catch (error) {
    throw error;
  }
};

export const searchShowsAPI = async (
  query: string,
): Promise<SearchShowShape[]> => {
  try {
    const response = await axiosInstance.get('/search/shows?q=' + query);
    return response.data;
  } catch (error) {
    throw error;
  }
};
