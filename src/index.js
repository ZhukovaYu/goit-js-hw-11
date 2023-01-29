
import { ImagesApiService } from './js/getPhotos';
import { createGalleryCards } from './js/createGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

 
const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const imagesApiService = new ImagesApiService();

const onSearchFormSubmit = async event => {
    event.preventDefault();
    const keyWord = event.target.elements.searchQuery.value.trim();
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
    console.log('hello');
//   imagesApiService.page += 1;
//   try {
//     const data = await imagesApiService.getPhotos();
//     const { data } = data;
      
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

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});


searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
