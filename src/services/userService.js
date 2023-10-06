// * userService.js
// * Name: User Service
// * Description: This file configures Axios for making API requests.
// * Since: v1.0.0
// * Author: @crdgom

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com', // ? The base URL for the API
  withCredentials: true, // ? Send cookies when cross-domain requests
});


export default instance; // ? Export instance for making API calls