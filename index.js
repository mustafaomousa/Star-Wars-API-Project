const fetch = require(`node-fetch`);

const person = "https://swapi.dev/api/people/1";

const movieArray = [];

fetch(person)
    .then(response => response.json())
    .then(person => {
        console.log(`${person.name}\n`)
        return fetch(person.homeworld);
    })
    .then(response2 => response2.json())
    .then(homeworld => console.log(homeworld))
