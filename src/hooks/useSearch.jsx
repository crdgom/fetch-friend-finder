// * useSearch.jsx
// * Name: useSearch
// * Description: Custom hook for handling search requests.
// * It returns a function that handles the search request.
// * Since: v1.0.0
// * Author: @crdgom

import axios from 'axios';

const handleSearch = async (filterParams, setDogList) => {
  try {
    const response = await axios.get(
      'https://frontend-take-home-service.fetch.com/dogs/search',
      filterParams,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const data = response.data;
      setDogList(data.dogList);
    } else {
      console.error('Error fetching dog list:', response.status);
    }
  } catch (error) {
    console.error('Axios error:', error);
  }
};

export default handleSearch;
