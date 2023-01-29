
import { ImagesApiService } from './js/getPhotos';
import { createGalleryCards } from './js/createGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 
const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const imagesApiService = new ImagesApiService();


let keyWord = ''

const onSearchFormSubmit = async event => {
    event.preventDefault();
    keyWord = event.target.elements.searchQuery.value.trim();
    imagesApiService.page = 1;

    
    if (keyWord === '') {
        return;
    }

    imagesApiService
        .getPhotos(keyWord)
        .then(data => {
            
            if (data.totalHits === 0) {
                galleryListEl.innerHTML = '';
                Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                galleryListEl.innerHTML = '';
                loadMoreBtnEl.classList.add('is-hidden');
            } else {
                if (data.totalHits > 0) {
                    Notify.success(`Hooray! We found ${data.totalHits} images.`);
                    // galleryListEl.innerHTML = '';
                    lightbox.refresh();
                    galleryListEl.innerHTML = createGalleryCards(data.hits);
                    currentHits = data.hits.length;
                }
                if (data.totalHits > 40) {
                    console.log(data.totalHits);
                    
                    loadMoreBtnEl.classList.remove('is-hidden');
                } else {
                    loadMoreBtnEl.classList.add('is-hidden');
                }
            }
            })
        .catch(err => {
            console.log(err);
        });
};


const onLoadMoreBtnClick = async event => {
    
    imagesApiService.page += 1;
    try {
        const data = await imagesApiService.getPhotos(keyWord, imagesApiService.page);

        galleryListEl.insertAdjacentHTML(
            'beforeend',
            createGalleryCards(data.hits)
        );
        lightbox.refresh();

        currentHits = currentHits + data.hits.length;
 
        if (currentHits === data.totalHits) {
            loadMoreBtnEl.classList.add('is-hidden');
            Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    }
    catch (err) {
        console.log(err);
    }
    };

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
}); 

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
