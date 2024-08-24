import axios from "axios";

export async function fetchPhotos(
  query: string,
  page: number
): Promise<Response | never> {
  const API_KEY = "prH5KncuhF_YstMcuNOPXclZAA5p29Duj9mAYItG-sU";

  axios.defaults.baseURL = "https://api.unsplash.com";
  axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

  const response = await axios.get<Response>("/search/photos", {
    params: {
      query,
      per_page: 16,
      page,
      orientation: "landscape",
    },
  });

  return response.data;
}
