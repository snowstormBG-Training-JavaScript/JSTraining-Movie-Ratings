const startAddMovieButton = document.querySelector('header>button');
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
// const cancelAddMovieButton = document.querySelector('#add-modal>.modal__actions>.btn.btn--passive');
// const finishAddMovieButton = document.querySelector('#add-modal>.modal__actions>.btn.btn--success');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const finishAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input'); //also valid
const entryHeadingSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryHeadingSection.style.display = 'block';
    } else {
        entryHeadingSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const moviesListElement = document.getElementById('movie-list');
    moviesListElement.children[movieIndex].remove();
    closeMovieDeletionModal();
    // moviesListElement.removeChild(moviesListElement.children[movieIndex]); //full compatibility
    updateUI();
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const deleteMovieCancel = deleteMovieModal.querySelector('button.btn--passive');
    let deleteMovieConfirm = deleteMovieModal.querySelector('button.btn--danger');
    //remove inherited listeners before adding.
    deleteMovieCancel.removeEventListener('click', closeMovieDeletionModal);
    // hacky - since the .bind returns new object, to properly send the old listener into garbage collection,
    // we will need to remove all references to the element's listener by replacing it with a clone.
    deleteMovieConfirm.replaceWith(deleteMovieConfirm.cloneNode(true));
    deleteMovieConfirm = deleteMovieModal.querySelector('button.btn--danger'); //need to select the clone

    deleteMovieCancel.addEventListener('click', closeMovieDeletionModal);
    deleteMovieConfirm.addEventListener('click', deleteMovie.bind(null, movieId));
    // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
            <button class="btn--danger">Delete</button>
        </div>
    `;

    newMovieElement.querySelector('button.btn--danger').addEventListener('click', deleteMovieHandler.bind(null, id));
    const moviesListElement = document.getElementById('movie-list');
    moviesListElement.append(newMovieElement);

};

const showMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();


};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};


const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
    // if (addMovieModal.classList.contains('visible')){
    //     addMovieModal.classList.toggle('visible');
    // }
    //toggleMovieModal();
};

const cancelAddingMovieHandler = () => {
    clearMovieInput();
    closeMovieModal();
};

const finishAddingMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === ''
        || imageUrlValue.trim() === ''
        || ratingValue.trim() === ''
        || +ratingValue < 1
        || +ratingValue > 5
    ) {
        alert('Please enter valid values');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);

    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    clearMovieInput();
    closeMovieModal();
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    toggleBackdrop();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddingMovieHandler);
finishAddMovieButton.addEventListener('click', finishAddingMovieHandler);