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

## testing

1. run `npm test` to run the tests

- the tests are using react-native-testing-library and jest (jest-expo)
- the detailed configuration can be found in `package.json` under "jest" key
- as the app is using scss, **mocks** folder contains a mock for scss style files
- the coverage is low at the moment, but I will improve it (if I have time)

## Typescript

- the project is written in typescript for better maintainability and readability
- there is one remained issue with ts, which is related to `BodyIntit` type under `RequestInit` type of Fetch's 2nd parameter: `initOptions` (see `src/utls/fetchWithSafeGuard.ts` line 12). None of the existing solutions looks elegent. I will keep looking for a better solution.

## Error Handling

- as fetch API fails to catch non 200 error, I have implemented a wrapper around fetch API to catch non 200 errors (response.ok is falsy). The wrapper is called `fetchWithSafeGuard` and can be found under `src/utils/fetchWithSafeGuard.ts`. This wrapper also handles the cases where the request body is not in JSON format and request headers are not set.

- the wrapper works with fetchErrHandler, which is a simple function that takes the error and returns a error message string. This function can be found under `src/utils/fetchErrHandler.ts`. Despite the fact that the function is simple, it can be extended to handle different types of errors effectively.

- I personally dislike the design of imdb API, as it returns 200 for `not found` error and simply passes the error message in the response body. This makes the differentiating between a successful response and an error response a bit tricky and difficult to develop a generic error handler.

## Load more button

- This button simply calls the same API with a different page number.

## year filter

- This filter is implemented by using the `year` query parameter of the API. The API does not support a range of years, so the UI only supports one year at the moment.
