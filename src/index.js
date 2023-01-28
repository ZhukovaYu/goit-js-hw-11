
import { ImagesApiService } from './js/getPhotos';
import { createGalleryCards } from './js/createGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
 
const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const imagesApiService = new ImagesApiService();

const onSearchFormSubmit = async event => {
    event.preventDefault();
    const keyWord = event.target.elements.searchQuery.value.trim();
    imagesApiService.page = 1;

    imagesApiService
        .getPhotos(keyWord)
        .then(data => {
            galleryListEl.innerHTML = createGalleryCards(data.data.hits);
            loadMoreBtnEl.classList.remove('is-hidden');
        })
        .catch(err => {
            console.log(err);
        });
};

const onLoadMoreBtnClick = async event => {
    console.log('hello');
//   imagesApiService.page += 1;
//   try {
//     const response = await imagesApiService.getPhotos();
//     const { data } = response;
      
//     galleryListEl.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCards(data.results)
//     );

//     if (imagesApiService.page === data.total_pages) {
//       loadMoreBtnEl.classList.add('is-hidden');
//     }
//     } catch (err) {
//     console.log(err);
//   }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);