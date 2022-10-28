import axios from "axios";

const API_URL = "https://api.elderscrollslegends.io/v1";
const PAGE_SIZE = 20

// In this case, I am using axios to download data from the api in batches of 20, and after the data has been fetched, it toggles the loading flag to false to remove the loading icon from the DOM.
export const fetchCards = async (currPage, name='', setLoading) => {

  const apiEndPoint = API_URL + `/cards?page=${currPage}&pageSize=${PAGE_SIZE}`
  const SearchByName = apiEndPoint + `&name=${name}`
  const cards = name ? await axios.get(SearchByName) : await axios.get(apiEndPoint)
  setLoading(false)

  return cards
};
