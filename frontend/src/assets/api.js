import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const addVector = (vectors) => {
  return axios.post(`${API_URL}/add-vector`, { vectors });
};