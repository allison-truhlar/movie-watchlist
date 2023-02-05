import { renderHtml } from "./renderHtml.js"

let myWatchlist = 
    (JSON.parse( localStorage.getItem("myWatchlist") )) ? JSON.parse( localStorage.getItem("myWatchlist") ) : []
const watchlistSection = document.getElementById("watchlist-section")

// On "remove" click, remove the target movie from the watchlist array. 
// If the watchlist still has movies in the array, render the movies and save the array without the target movie to local storage.
// If the watchlist is now empty, render the placeholder text and clear local storage.
watchlistSection.addEventListener("click", e => {
        if(e.target.dataset.imdbId){
            
            const targetMovie = myWatchlist.filter(movie => {
                return movie.imdbID === e.target.dataset.imdbId
            })[0]
            
            const targetIndex = myWatchlist.indexOf(targetMovie)
            myWatchlist.splice(targetIndex, 1)
            
            if(myWatchlist.length){
                localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
                renderHtml(myWatchlist, watchlistSection, false)
            } 
            else{
                watchlistSection.style.display="flex"
                watchlistSection.innerHTML = 
                `<p class="placeholder-text">Your watchlist is looking a little empty...</p>
                <a class="add-btn bold" href="index.html">
                    <i class="fa-solid fa-circle-plus"></i> Let's add some movies!
                </a>`
                localStorage.clear()
            }  
        }
})

// Function to render the watchlist, if there are any movies in the array 
function renderWatchlist() {
    if(myWatchlist.length){
        renderHtml(myWatchlist, watchlistSection, false)
    }
}
// Calls the renderWatchlist function immediately when the watchlist page is loaded.
renderWatchlist()