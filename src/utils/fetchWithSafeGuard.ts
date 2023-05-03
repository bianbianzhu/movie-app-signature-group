import ResponseError from '../constants/ResponseError';

export const isPlainObject = (value: unknown) =>
  typeof value === 'object' && value !== null && value?.constructor === Object;

export const fetchWithSafeGuard = async (
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  // For POST, PUT and PATCH, convert the body to JSON string AND set the Content-Type header to application/json
  let initOptions = init;
  //TODO: body has a type of `BodyInit` which cannot be an object or array - need to fix this. Don't like the assertion way.
  if (initOptions?.body) {
    if (isPlainObject(initOptions?.body) || Array.isArray(initOptions?.body)) {
      initOptions = {
        ...initOptions,
        body: JSON.stringify(initOptions?.body),
        headers: {
          'Content-type': 'application/json',
          ...initOptions?.headers,
        },
      };
    }
  }

  const response = await fetch(url, initOptions);

  if (!response.ok) {
    throw new ResponseError(`Bad Response`, response);
  }

  return response;
};
