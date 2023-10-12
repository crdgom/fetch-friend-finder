// * userService.js
// * Name: User Service
// * Description: This file configures Axios for making API requests.
// * BaseURL: https://frontend-take-home-service.fetch.com
// * Login Endpoint: /auth/login (POST, name, email)
// * Logout Endpoint: /auth/logout (POST, invalidate user´s session)
// * Breeds Endpoint: /dogs/breeds (GET, returns an array of breeds)
// * Search Endpoint: /dogs/search (GET, returns an array of dogs id´s and next and/or prev parameters to add in the url´s)
// * Dog Endpoint: /dogs (POST, returns an object with the dog´s information)
// * Since: v1.0.0
// * Author: @crdgom

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com', // ? The base URL for the API
  withCredentials: true, // ? Send cookies when cross-domain requests
});

const loginURL = '/auth/login'; // ? Login endpoint
const logoutURL = '/auth/logout'; // ? Logout endpoint
const breedsURL = '/dogs/breeds'; // ? Breeds endpoint
const searchURL = '/dogs/search'; // ? Search endpoint
const dogURL = '/dogs'; // ? Dog endpoint

export const login = (name, email) => instance.post(loginURL, { name, email }); // ? Login function
export const logout = () => instance.post(logoutURL); // ? Logout function
export const getBreeds = () => instance.get(breedsURL);
console.log(getBreeds) // ? Get breeds function
export const searchDogs = (breed, page) => instance.get(searchURL, { params: { breed, page } }); // ? Search dogs function
export const getDog = (id) => instance.post(dogURL, { id }); // ? Get dog function

export default instance;
