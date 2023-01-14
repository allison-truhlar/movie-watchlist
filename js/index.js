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
            
            if(movies.Search){
                const movieIds = movies.Search.map(movie =>{
                return movie.imdbID
                })
            searchMovies(movieIds)
            }
            
            else{
                searchResultSection.style.display = "flex"
                searchResultSection.innerHTML = `<div class="placeholder-container"><p class="placeholder-text">Unable to find what you're looking for.  Please try another search.</p></div>`
                searchInput.value=""
            }
            
        })
})

// On "add" click, push the target movie to the watchlist array, and store in local storage
// Render the search results with the target movie removed
searchResultSection.addEventListener("click", e => {
        if(e.target.dataset.id){
            
            const targetMovie = searchResultArray.filter(movie => {
                return movie.value.imdbID === e.target.dataset.id
            })[0]
            
            myWatchlist.push(targetMovie)
            localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
            
            const targetIndex = searchResultArray.indexOf(targetMovie)
            searchResultArray.splice(targetIndex, 1)
            renderHtml(searchResultArray, searchResultSection, true)
        }
        

})

// Function to fetch movies from a search in the Open Movie Database API
async function searchMovies(movieIds){
    
        searchResultArray = await Promise.allSettled(movieIds.map(async id => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=28fc8eca&i=${id}`)
            return res.json()      
        }))
        
        renderHtml(searchResultArray, searchResultSection, true)
               
}   