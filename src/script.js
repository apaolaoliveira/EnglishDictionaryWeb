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
      .then((response) => {
        if(!response) throw new Error('Word not found');
        return response.json();
      })
      .then((data) => {
        this.displayResponse({
          word: data[0].word,
          pronunciation: data[0].phonetics[0].text,
          category: data[0].meanings[0].partOfSpeech,
          definition: data[0].meanings[0].definitions[0].definition,
          example: data[0].meanings[0].definitions[0].example,
          audio: data[0].phonetics[1].audio,
        })
      })
      .catch(() => this.displayMessage('Could not find the word'));
  }

  displayResponse(data) {
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

      if(id === 'pronunciation'){
        element.innerText = 'pronunciation ' + value;
        return;
      }
      
      element.classList.remove('hide');
      element.innerText = value;
    });

    this.audio.setAttribute('src', data.audio);
    this.audioBtn.addEventListener('click', () => this.audio.play());
    
    this.message.classList.add('hide');
    this.result.classList.remove('hide');
    this.inputWord.value = '';
  }

  displayMessage(text){
    this.message.innerHTML = text;
  }
}

window.addEventListener('DOMContentLoaded', () => new EnglishDictionary());