export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? DeepReadonlyArray<U>
  : DeepReadonlyObject<T>;

type Primitive = string | number | boolean | undefined | null;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

enum ResponseFlag {
  TRUE = 'True',
  FALSE = 'False',
}

export interface IRatings {
  Source: string;
  Value: string;
}

export interface IMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export type IMovieSummary = Pick<
  IMovie,
  'Title' | 'Year' | 'imdbID' | 'Type' | 'Poster'
>;

export interface IMovieError {
  Response: string;
  Error: string;
}

export interface IFetchMoviesResponseData {
  Search: IMovieSummary[];
  Response: ResponseFlag;
  totalResults: string;
}

export interface ISearchMoviesResponseData {}
