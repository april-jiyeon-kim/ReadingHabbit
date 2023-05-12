import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { QueryFunction } from "react-query";

const options = {
  headers: {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET,
  },
};

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

export const naverApi = {
  //@ts-ignore
  search: ({ queryKey }) => {
    const [_, query] = queryKey;

    const api_url = `https://openapi.naver.com/v1/search/book.json?query=${encodeURI(
      query
    )}`;
    return fetch(api_url, options).then((res) => res.json());
  },
};

export const googleApi = {
  //@ts-ignore
  search: ({ queryKey }) => {
    const [_, query] = queryKey;

    const api_url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}`;
    return fetch(api_url, options).then((res) => res.json());
  },
  //@ts-ignore
  detail: ({ queryKey }) => {
    const [_, query] = queryKey;

    const api_url = `https://www.googleapis.com/books/v1/volumes/${query}`;
    return fetch(api_url, options).then((res) => res.json());
  },
};
