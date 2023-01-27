// The renderHtml function takes in three parameters:
// 1. movieArray - an array of movie data from the Open Movie Database (for search results) or local storage (for the watchlist) to generate HTML from 
//2. element - the document element to render the HTML to. Either searchResultSection or watchlistSection. 
//3. addBtn - a Boolean that is true if an "add" button should be rendered in the HTML (for the search results), and false if a "remove" button should be rendered (for the watchlist)

function renderHtml(movieArray, element, addBtn){
    element.style.display = "block"
    element.style.paddingTop = "20px"
    
    const btnIcon = 
        addBtn ? {Symbol: `<i class="fa-solid fa-circle-plus"></i>`, Text: "Watchlist"}
            : {Symbol: `<i class="fa-solid fa-circle-minus"></i>`, Text: "Remove"}  
    
    const html = movieArray.map(movie => {
        const posterImg = 
            movie.value.Poster === "N/A" ? `<p class="placeholder-text placeholder-poster">Poster not found</p>`
            : `<img src=${movie.value.Poster} class="poster">`
        
       return `<div class="search-result" id=${movie.value.imdbID}>
                    <div class="poster-container">
                    ${posterImg}
                    </div>
                    <div class="description-container">
                        <div class="movie-header">
                            <p class="movie-title">${movie.value.Title}</p>
                            <p class="movie-rating">
                                <i class="fa-solid fa-star"></i>
                                ${movie.value.imdbRating}
                            </p>
                        </div>
                        <div class="movie-subheader">
                            <div class="movie-subheader-left">
                                <p class="movie-info">${movie.value.Runtime}</p>
                                <p class="movie-info">${movie.value.Genre}</p>
                            </div>
                            <button data-imdb-id=${movie.value.imdbID} class="add-btn">${btnIcon.Symbol} ${btnIcon.Text}</button>
                        </div>
                        <p class="movie-plot">${movie.value.Plot}</p>
                    </div>
                </div>`
         
    }).join("")
            
    element.innerHTML = html
    
}

export { renderHtml }