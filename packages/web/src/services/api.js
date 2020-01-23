import axios from 'axios';
import devradar from '~/config/devradar';

const api = axios.create({
  baseURL: devradar.apiURL,
});

export default api;
