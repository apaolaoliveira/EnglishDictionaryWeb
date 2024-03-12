class EnglishDictionary {
  API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  result = document.querySelector('#result');
  audio = document.querySelector('#audio');
  audioBtn = document.querySelector('#audio-btn');
  search = document.querySelector('#search-btn');
  inputWord = document.querySelector('#search-word');

  constructor() {
    this.search.addEventListener('click', () => {
      fetch(`${this.API_URL}${this.inputWord.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayResponse({
          word: data[0].word,
          pronunciation: data[0].phonetics[0].text,
          category: data[0].meanings[0].partOfSpeech,
          definition: data[0].meanings[0].definitions[0].definition,
          example: data[0].meanings[0].definitions[0].example,
          audio: data[0].phonetics[1].audio,
        });
      });
    });
  }


  displayResponse(data) {
    console.log(data);
    const elementMap = {
      'word-title': data.word,
      'pronunciation': data.pronunciation,
      'category': data.category,
      'definition': data.definition,
      'example': data.example,
    }

    Object.entries(elementMap).forEach(([id, value]) => {
      const element = document.getElementById(id);

      if(value === undefined) {
        element.classList.add('hide');
        return;
      }
      
      element.classList.remove('hide');
      element.innerText = value;
    });

    this.audio.setAttribute('src', data.audio);
    this.audioBtn.addEventListener('click', () => this.audio.play());
  }
}

window.addEventListener('DOMContentLoaded', () => new EnglishDictionary());