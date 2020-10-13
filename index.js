const fetch = require(`node-fetch`);

const person = "https://swapi.dev/api/people/1";

fetch(person)
    .then(response => response.json())
    .then(person => {
        console.log(`${person.name}\n`)
        const homeworldUrl = person.homeworld;
        fetch(homeworldUrl)
            .then(response2 => response2.json())
            .then(homeworld => console.log(homeworld))
    })
    .then()