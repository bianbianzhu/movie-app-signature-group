import { useEffect, useMemo, useState } from 'react';
import Constants from 'expo-constants';
import {
  DeepReadonly,
  IMovieSummary,
  IFetchMoviesResponseData,
} from '../constants/interfaces';
import { fetchWithSafeGuard } from '../utils/fetchWithSafeGuard';
import fetchErrHandler from '../utils/fetchErrHandler';

const API_KEY: string = Constants?.manifest?.extra?.omdbapi?.api_key || '';
const BASE_URL: string = Constants?.manifest?.extra?.omdbapi?.base_url || '';

const DEFAULT_SEARCH_PARAM = 'batman';

const useFetchMovies = (pageNum: number, year: string) => {
  const [movies, setMovies] = useState<DeepReadonly<IMovieSummary[]>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const url = useMemo(() => {
    const searchParam = DEFAULT_SEARCH_PARAM;
    return `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      searchParam
    )}&y=${encodeURIComponent(year)}&page=${encodeURIComponent(pageNum)}`;
  }, [pageNum, year]);

  useEffect(() => {
    (async () => {
      setError('');
      setIsLoading(true);
      try {
        const response = await fetchWithSafeGuard(url, {
          method: 'GET',
        });
        const data: IFetchMoviesResponseData = await response.json();

        // inappropiate API design - should return 404 when no content instead of 200 with error message
        if ('Response' in data && data.Response === 'False') {
          setError('Movie not found');
        }

        setMovies(data?.Search ?? []);
      } catch (error: unknown) {
        const errMsg = await fetchErrHandler(error);
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { movies, isLoading, error };
};

export default useFetchMovies;
