import { renderHtml } from "./renderHtml.js"

let myWatchlist = 
    (JSON.parse( localStorage.getItem("myWatchlist") )) ? JSON.parse( localStorage.getItem("myWatchlist") ) : []
const watchlistSection = document.getElementById("watchlist-section")
const watchlistPlaceholder = document.getElementById("watchlist-placeholder")

// On "remove" click, remove the target movie from the watchlist array. 
// If the watchlist still has movies in the array, render the movies and save the array without the target movie to local storage.
// If the watchlist is now empty, render the placeholder text and clear local storage.
watchlistSection.addEventListener("click", e => {
        if(e.target.dataset.id){
            
            const targetMovie = myWatchlist.filter(movie => {
                return movie.value.imdbID === e.target.dataset.id
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
                <div class="btn-container">
                    <a class="add-remove-btn" href="index.html">+</a>
                    <p class="add-btn-placeholder-text">Let's add some movies!</p>
                </div>`
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
