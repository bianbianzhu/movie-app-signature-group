import { useEffect, useMemo, useState } from 'react';
import Constants from 'expo-constants';
import { DeepReadonly, IMovie } from '../constants/interfaces';
import { fetchWithSafeGuard } from '../utils/fetchWithSafeGuard';
import fetchErrHandler from '../utils/fetchErrHandler';

const API_KEY: string = Constants?.manifest?.extra?.omdbapi?.api_key || '';
const BASE_URL: string = Constants?.manifest?.extra?.omdbapi?.base_url || '';

const useSearchMovie = (title?: string, imdbID?: string) => {
  const [movie, setMovie] = useState<DeepReadonly<IMovie> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const url = useMemo(() => {
    return `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(
      title || ''
    )}&i=${encodeURIComponent(imdbID || '')}`;
  }, [title, imdbID]);

  useEffect(() => {
    (async () => {
      setError('');
      setIsLoading(true);
      try {
        const response = await fetchWithSafeGuard(url, {
          method: 'GET',
        });

        const data: IMovie = await response.json();

        // inappropiate API design - should return 404 when no content instead of 200 with error message
        if ('Response' in data && data.Response === 'False') {
          setError('Movie not found');
        }

        setMovie(data);
      } catch (error: unknown) {
        const errMsg = await fetchErrHandler(error);
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { movie, isLoading, error };
};

export default useSearchMovie;
