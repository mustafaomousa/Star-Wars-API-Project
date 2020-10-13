const fetch = require(`node-fetch`);
const fs = require('fs').promises

const person = "https://swapi.dev/api/people/1";

const globalMovieArray = [];

fetch(person)
    .then(response => response.json())
    .then(person => {
        console.log(`${person.name}\n`)
        return fetch(person.homeworld);
    })
    .then(response2 => response2.json())
    .then(homeworld => {
        const filmArray = homeworld.films
        filmArray.map(film => {
            globalMovieArray.push(film);
        })
        let movieRequests = globalMovieArray.map(movie => fetch(movie));
        Promise.all(movieRequests)
            .then(responses => {
                Promise.all(responses.map(res => res.json()))
                .then(film => {console.log(film)})
            })
            .then(movieResponse => movieResponse.json())
            .then(movie => console.log(movie));

  


    // .then(homeworld => fetch(homeworld.films))
    // .then(response3 => response3.json())
    // .then(films => console.log(films))
    // .then(homeworld => console.log(json))
    // .then(response3 => response3.json())
    // .then(films => {
    //     console.log(films)
    })
