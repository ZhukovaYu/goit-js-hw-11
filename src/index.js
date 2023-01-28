
import { ImagesApiService } from './js/getPhotos';
import { createGalleryCards } from './js/createGallery';
 
const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');


const imagesApiService = new ImagesApiService();


const onSearchFormSubmit = async event => {
    event.preventDefault();
    const keyWord = event.target.elements.searchQuery.value.trim();

    imagesApiService
        .getPhotos(keyWord)
        .then(data => {
            console.log(data);
            console.log(data.data.hits);
            galleryListEl.innerHTML = createGalleryCards(data.data.hits);
        })
        .catch(err => {
            console.log(err);
        });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);

