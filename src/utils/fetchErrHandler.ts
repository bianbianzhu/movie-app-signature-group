import ResponseError from '../constants/ResponseError';
import { IMovieError } from '../constants/interfaces';

const fetchErrHandler = async (error: unknown): Promise<string> => {
  if (error instanceof ResponseError) {
    const { Error: errMsg }: IMovieError = await error?.response?.json();

    switch (error?.response?.status) {
      case 400:
        return errMsg;

      case 401:
        return errMsg;

      case 404:
        return errMsg;

      case 500:
        return 'Internal Server Error';

      default:
        return 'Unhandled Error';
    }
  } else {
    return 'Unknown Error';
  }
};

export default fetchErrHandler;
