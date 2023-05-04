# Movie App - Signature Group

This repository holds the source code and config for the Movie app.

## Prerequisite

- Node 18.16.0 (LTS)
- Node >= 16 should work (tested on 16.16.0)

## Setup

1. Clone the repository
2. Navigate to the repository
3. Install project dependencies (`npm i`)
4. No need to install expo-cli globally, it is already included in expo after v46
5. run `npm start` to start the metro bundler
6. scan the QR code with your phone to run the app on your phone

## Testing

1. run `npm test` to run the tests

- the tests are using react-native-testing-library and jest (jest-expo)
- the detailed configuration can be found in `package.json` under "jest" key
- as the app is using scss, **mocks** folder contains a mock for scss style files
- the coverage is low at the moment, but I will improve it (if I have time)

## Typescript

- the project is written in typescript for better maintainability and readability
- there is one remained issue with ts, which is related to `BodyIntit` type under `RequestInit` type of Fetch's 2nd parameter: `initOptions` (see `src/utls/fetchWithSafeGuard.ts` line 12). None of the existing solutions looks elegent. I will keep looking for a better solution.

## Change of design

- I have changed the design that was provided in the task description: The search results from the search bar will no longer be displayed in a list similar to the home screen. Instead, the result will be displayed in the movie detail screen. The reasons are:

1. The api provided `for this specific task` from the description http://www.omdbapi.com/?t=[title]&apikey=[yourkey] can only search for one movie at a time. So, it does not make sense to display the result in a list.
2. Certainly, using the other api http://www.omdbapi.com/?s=batman&apikey=[yourkey] can return a list of movies. However, this api has several limitations regarding the search filtering. For example, when the `title` (t) search param is general, like `b` or `ba`, the response would be `Too many results`.
3. A potential solution to this would be, validate the input and only call the api when the input is over a certain length. However, this would not be a good user experience, as many of the movies have short titles and they would not be searchable. (I personally would change the api design)
4. The other solution would be, if the response is `Too many results`, display a list of movies with the same title but in a certain year (the api does not support year range). However, this would not be a good user experience, as the user would not be able to search for all movies.
5. I should also implement `fuzzy search` to make the search more user friendly. However, I did not have time to do so and probably should not do that from the front end side.

- If you have any recommendation, please let me know.

## Error Handling

- as fetch API fails to catch non 200 error, I have implemented a wrapper around fetch API to catch non 200 errors (response.ok is falsy). The wrapper is called `fetchWithSafeGuard` and can be found under `src/utils/fetchWithSafeGuard.ts`. This wrapper also handles the cases where the request body is not in JSON format and request headers are not set.

- the wrapper works with fetchErrHandler, which is a simple function that takes the error and returns a error message string. This function can be found under `src/utils/fetchErrHandler.ts`. Despite the fact that the function is simple, it can be extended to handle different types of errors effectively.

- I personally dislike the design of imdb API, as it returns 200 for `not found` error and simply passes the error message in the response body. This makes the differentiating between a successful response and an error response a bit tricky and difficult to develop a generic error handler.

## Load more button

- This button simply calls the same API with a different page number.

## Year filter

- This filter is implemented by using the `year` query parameter of the API. The API does not support a range of years, so the UI only supports one year at the moment.

- To reset the year filter, load all movies and click the `reset` button. I did this on purpose, as I am bad 😈
