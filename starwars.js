// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'

// ======================================== atividade 1
import { AudioPlayer } from "./music.js"

const audioPlayer = new AudioPlayer()
audioPlayer.start({ audioUrl: 'audio/tema-sw.mp3', coverImageUrl:'imgs/logo.svg', title: 'Intro', artist: 'John Williams' }, document.body)


// ======================================== atividade 2 + 3 + 4
import { restartAnimation } from './restart-animation.js'
import { friendlyFetch } from './friendly-fetch.js'

const filmesListEl = document.querySelector('#filmes ul')
while(filmesListEl.firstChild) filmesListEl.removeChild(filmesListEl.firstChild) // limpar filhos

const friendlySWAPI = endpoint => friendlyFetch(API_ENDPOINT + endpoint)
const filmes = await friendlySWAPI('/films')
                        .then(res => res.results.sort((a, b) => a.episode_id - b.episode_id)) // ordem crescente / atividade 4
                        .catch(() => [])

const int2roma = i => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][Number(i)-1] || String(i)

// atividade 3
const preEl = document.querySelector('pre')
function setPreText (episode_id = 0, title = '', text = '') {
    preEl.innerText = `
        Episode - ${int2roma(episode_id)}
        ${title.toUpperCase()}

        ${text}
    `
}

for(let filme of filmes) {
    const li = document.createElement('li')
    li.innerText = `${`Episode ${int2roma(filme.episode_id)}`.padEnd(11)} - ${filme.title}`
    li.value = filme.episode_id

    // atividade 3
    li.addEventListener('click', e => {
        setPreText(filme.episode_id, filme.title, filme.opening_crawl)
        restartAnimation(preEl)
    })

    filmesListEl.appendChild(li)
}
