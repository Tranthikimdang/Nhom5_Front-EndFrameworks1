import { APP_CONFIG } from './app.config';
import { IAPIEndpoint } from '../interfaces';

export const API_BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINT: IAPIEndpoint = {
  auth: {
    base: API_BASE_URL + '/' + 'auth',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  comment: {
    get: '/comments',
    create: '/comment',
    update: '/comment',
    delete: '/comment',
  },
  user: {
    get: '/users',
    create: '/user',
    update: '/user',
    delete: '/user',
  },
  category: {
    get: '/categories',
    create: '/category',
    update: '/category',
    delete: '/category',
  },
  product: {
    get: '/products',
    create: '/product',
    update: '/product',
    delete: '/product',
  }
};
