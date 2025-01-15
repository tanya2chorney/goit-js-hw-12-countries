import "../style/style.css";
import fetchCountries from "../js/fetchCountries";
import debounce from "lodash.debounce";
import { error, info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const searchInput = document.getElementById("search-input");
const countryList = document.getElementById("country-list");
const countryInfo = document.getElementById("country-info");

searchInput.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  const query = e.target.value.trim();

  if (query.length < 3) {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(query)
    .then((countries) => {
      clearCountryList();
      clearCountryInfo();

      if (countries.length > 10) {
        showInfo("Занадто багато збігів. Уточніть запит.");
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      } else if (countries.length === 1) {
        renderCountryInfo(countries[0]);
      } else {
        showError("Країну не знайдено.");
      }
    })
    .catch(() => {
      showError("Сталася помилка, спробуйте ще раз.");
    });
}

function renderCountryList(countries) {
  countryList.innerHTML = countries
    .map((country) => `<li>${country.name}</li>`)
    .join("");
}

function renderCountryInfo(country) {
  const { name, capital, population, languages, flag } = country;

  countryInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="${flag}" alt="Прапор ${name}" width="300">
        <p><strong>Столиця:</strong> ${capital}</p>
        <p><strong>Населення:</strong> ${population.toLocaleString()}</p>
        <p><strong>Мови:</strong> ${languages
          .map((lang) => lang.name)
          .join(", ")}</p>
    `;
}

function clearCountryList() {
  countryList.innerHTML = "";
}

function clearCountryInfo() {
  countryInfo.innerHTML = "";
}

function showError(message) {
  error({
    text: message,
    delay: 2000,
  });
}

function showInfo(message) {
  info({
    text: message,
    delay: 2000,
  });
}
