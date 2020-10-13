const fetch = require(`node-fetch`);
const fs = require('fs').promises

const person = "https://swapi.dev/api/people/3";
let personName = '';

const globalMovieArray = [];

fetch(person)
    .then(response => response.json())
    .then(person => {
        // console.log(`${person.name}\n`)
        personName = person.name;
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
                .then(films => {
                    console.log(`\n${personName} has starred in:\n`)
                    for(let film of films) {
                    console.log(film.title)
                    }
                })
            })

  


    // .then(homeworld => fetch(homeworld.films))
    // .then(response3 => response3.json())
    // .then(films => console.log(films))
    // .then(homeworld => console.log(json))
    // .then(response3 => response3.json())
    // .then(films => {
    //     console.log(films)
    })
