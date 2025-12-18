import { request } from './api';

export const getAllGiveaways = async () => {
  const data = await request('GET', '/classes/giveAway');
  return data.results;
};

export const getUserById = async (id) => {
  const data = await request('GET', `/users/${id}`);
  return data;
};


export const getGiveawayById = async (id) => {
  const data = await request('GET', `/classes/giveAway/${id}`);
  return data;
};


export const createGiveaway = (data, sessionToken) => {
  return request('POST', '/classes/giveAway', data, sessionToken);
};


export const editGiveaway = (id, data, sessionToken) => {
  return request('PUT', `/classes/giveAway/${id}`, data, sessionToken);
};


export const deleteGiveaway = (id, sessionToken) => {
  return request('DELETE', `/classes/giveAway/${id}`, null, sessionToken);
};
