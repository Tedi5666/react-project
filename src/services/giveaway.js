const BASE_URL = 'https://parseapi.back4app.com/classes/giveAway';

const headers = {
  'X-Parse-Application-Id': 'APP_ID',
  'X-Parse-JavaScript-Key': 'JS_KEY',
  'Content-Type': 'application/json',
};

export async function getAllGiveaways() {
  const res = await fetch(BASE_URL, { headers });
  const data = await res.json();
  return data.results;
}

export async function getGiveawayById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { headers });
  return res.json();
}
