import axios from 'axios';
import { GITHUB_TOKEN } from '@env';

const BASE_URL = 'https://api.github.com';

export const api = axios.create({
  baseURL: BASE_URL,
});

axios.defaults.headers.common['Authorization'] = GITHUB_TOKEN;
