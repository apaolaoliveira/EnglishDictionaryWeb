class EnglishDictionary {
  API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  result = document.querySelector('#result');
  sound = document.querySelector('#sound');
  search = document.querySelector('#search');

  constructor() {
    this.search.addEventListener('click', () => {
      let inputWord = document.querySelector('#search-word').value;
      fetch(`${this.API_URL}${inputWord}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
    });
  }
}

window.addEventListener('DOMContentLoaded', () => new EnglishDictionary());