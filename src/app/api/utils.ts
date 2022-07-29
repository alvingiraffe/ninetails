export const doNetworkRequest = async (
  url: string,
  options?: RequestInit,
) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      try {
        const responseBody = await response.json();
        if (responseBody) {
          return responseBody;
        }
      } catch (e) {
        throw new Error(`response body failed to parse ${e}`);
      }
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (e) {
    throw new Error(`request failed ${e}`);
  }
};
