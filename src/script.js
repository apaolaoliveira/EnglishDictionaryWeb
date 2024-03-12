class EnglishDictionary {
  API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  audio = document.querySelector('#audio');
  audioBtn = document.querySelector('#audio-btn');

  search = document.querySelector('#search-btn');
  inputWord = document.querySelector('#search-word');
  result = document.querySelector('#result');
  message = document.querySelector('#message');

  constructor() {
    this.search.addEventListener('click', () => this.searchWord(this.inputWord.value));
  }

  searchWord(word) {
    this.displayMessage(`Searching the meaning of "<strong>${word}</strong>"`); 
    
    fetch(`${this.API_URL}${word}`)
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
        })
      })
      .catch(this.displayMessage('Could not find the word'));
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
    this.message.classList.add('hide');
    this.result.classList.remove('hide');
  }

  displayMessage(text){
    this.message.innerHTML = text;
  }
}

window.addEventListener('DOMContentLoaded', () => new EnglishDictionary());