import { renderHtml } from "./renderHtml.js"

localStorage.clear()
let searchResultArray = []
let myWatchlist = 
    (JSON.parse( localStorage.getItem("myWatchlist") )) ? JSON.parse( localStorage.getItem("myWatchlist") ) : []
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchResultSection = document.getElementById("search-result-section")

// On search "click," fetch list of search results.
// If there is a response, extract the movie imdbIDs.
// Otherwise, display placeholder text for no search results.
searchBtn.addEventListener("click", e =>{
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?apikey=28fc8eca&s=${searchInput.value}`)
        .then(res => res.json())
        .then(movies => {
            const movieIds = movies.Search.map(movie =>{
                return movie.imdbID
            })
            console.log(movieIds)
            searchMovies(movieIds)
            })
        .catch(err => {
            searchResultSection.style.display = "flex"
            searchResultSection.innerHTML = `<div class="placeholder-container"><p class="placeholder-text">Unable to find what you're looking for.  Please try another search.</p></div>`
            searchInput.value=""
        })
})

// On "add" click, identify target movie. Check if part of watchlist array. 
// If not, add to the watchlist array and store in local storage. Change "+" to "check" for the watchlist button for that movie.

searchResultSection.addEventListener("click", e => {
        if(e.target.dataset.imdbId){
            
            const targetMovie = searchResultArray.filter(movie => {
                return movie.imdbID === e.target.dataset.imdbId
            })[0]

            if(!myWatchlist.includes(targetMovie)){
                myWatchlist.push(targetMovie)
                localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
            
                const targetButton = document.querySelector('[data-imdb-id =' + e.target.dataset.imdbId +']')
                targetButton.innerHTML = `<i class="fa-solid fa-circle-check"></i> Watchlist`
                targetButton.style.color = "darkgreen"
            }

        }
        

})

// Function to fetch movies from a search in the Open Movie Database API
async function searchMovies(movieIds){
        
        searchResultArray = await Promise.all(movieIds.map(async id => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=28fc8eca&i=${id}`)
            return res.json()      
        }))
                
        renderHtml(searchResultArray, searchResultSection, true)
               
}   