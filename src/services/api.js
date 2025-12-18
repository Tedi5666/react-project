import { config } from '../config/config';

export async function request(method, url, data, sessionToken) {
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': config.appId,
      'X-Parse-JavaScript-Key': config.jsKey,
      'Content-Type': 'application/json',
    },
  };

  if (sessionToken) {
    options.headers['X-Parse-Session-Token'] = sessionToken;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${config.appUrl}${url}`, options);

  if (!res.ok) {
    const error = await res.json();
      console.error('PARSE ERROR:', error);
    throw error;
  }

  return res.json();
}
