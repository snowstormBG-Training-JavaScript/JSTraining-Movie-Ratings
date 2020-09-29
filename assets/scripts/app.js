const startAddMovieButton = document.querySelector('header>button');
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
// const cancelAddMovieButton = document.querySelector('#add-modal>.modal__actions>.btn.btn--passive');
// const finishAddMovieButton = document.querySelector('#add-modal>.modal__actions>.btn.btn--success');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const finishAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input'); //also valid


const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');

};

const toggleBackdrop = () => {
    // backdrop.classList.toggle('visible');
    // if (addMovieModal.classList.contains('visible')){
    //     addMovieModal.classList.toggle('visible');
    // }
    toggleMovieModal();
};

const cancelAddingMovieHandler = () =>{
    toggleBackdrop();
};

const finishAddingMovieHandler = () =>{
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === ''
        || imageUrlValue.trim() === ''
        || ratingValue.trim() === ''
        || +ratingValue < 1
        || +ratingValue > 5
    ){
        alert('Please enter valid values');
        return;
    }

    toggleBackdrop();
};

const backdropClickHandler = () => {
    toggleMovieModal();
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddingMovieHandler);
finishAddMovieButton.addEventListener('click', finishAddingMovieHandler);