const BASE_URL = "https://restcountries.com/v2/name";

export default function fetchCountries(searchQuery) {
  if (!searchQuery) return Promise.reject("Порожній запит");

  return fetch(
    `${BASE_URL}/${searchQuery}?fields=name,capital,population,languages,flag`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Країну не знайдено");
    }
    return response.json();
  });
}
