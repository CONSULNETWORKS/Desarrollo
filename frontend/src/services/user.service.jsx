import axios from 'axios';
import authHeader from './auth-header';

// Usa la variable de entorno
const API_URL = import.meta.env.VITE_API_URL + '/api/test';

/*const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};*/

const getUserBoard = () => {
  return axios.get(API_URL + '/user', { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + '/mod', { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + '/admin', { headers: authHeader() });
};

const getAdminCNW = () => {
  return axios.get(API_URL + '/adminCNW', { headers: authHeader() });
};

export default {
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAdminCNW,
};