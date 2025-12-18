import { request } from './api';

export const login = (username, password) => {
  return request(
    'GET',
    `/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );
};

export const register = (username, email, imageUrl, password) => {
  const data = {
    username,
    email,
    imageUrl,
    password,
    posts: [],
  };

  return request('POST', '/users', data);
};

export const logout = (sessionToken) => {
  return request('POST', '/logout', null, sessionToken);
};
