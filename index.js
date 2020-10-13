const fetch = require(`node-fetch`);
const fs = require('fs').promises

const person = "https://swapi.dev/api/people/1";
let personName = '';
let newFileContents = '';
let titles = [];

fetch(person)
    .then(response => response.json())
    .then(person => {
        personName = getPersonName(person)
        return fetch(person.homeworld);
    })
    .then(response2 => response2.json())
    .then(homeworld => {
        const filmArray = createFilmArray(homeworld)
        let movieRequests = filmArray.map(movie => fetch(movie));
        Promise.all(movieRequests)
            .then(responses => {
                Promise.all(responses.map(res => res.json()))
                .then(films => {
                    addIntroToFileContents(homeworld, films);
                    createFile();
                })
            })
  })


  function addIntroToFileContents (homeworld, films) {
      newFileContents += `My name is ${personName}, I am from ${getPersonLocation(homeworld)}
I starred in the following films: `
      for (let film of films) {
          titles.push(' ' + film.title)
      }
      newFileContents += `${titles.toString(`,`)}.`
  }

  function createFile () {
      fs.writeFile('character.txt', newFileContents, 'utf-8')
          .then(() => console.log("Your requested info has been turned into a file"))
          .catch(e => console.log("You've encountered the following error:\n\n " + e))
  }

  function getPersonName (person) {
      return person.name;
  }

  function getPersonLocation (homeworld) {
      return homeworld.name;
  }

  function createFilmArray (homeworld) {
    return homeworld.films;
  }
