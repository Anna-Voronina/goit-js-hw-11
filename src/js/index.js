import { Notify } from 'notiflix';
import { PixabayAPI } from './pixabay-api.js';
import { LoadMoreBtn } from './load-more-btn.js';
import { createGalleryCards } from './templates/gallery-cards.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const pixabayAPI = new PixabayAPI();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more-btn',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit(event) {
  event.preventDefault();

  const searchFormInputValue =
    event.currentTarget.elements.searchQuery.value.trim();

  if (searchFormInputValue === '') {
    refs.gallery.innerHTML = '';
    Notify.failure('Please fill out the search field!');
    return;
  }

  pixabayAPI.page = 1;
  pixabayAPI.query = searchFormInputValue;

  pixabayAPI
    .fetchPhotosByQuery()
    .then(({ data }) => {
      if (data.totalHits === 0) {
        refs.gallery.innerHTML = '';
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      loadMoreBtn.show();
      loadMoreBtn.disable();
      refs.gallery.innerHTML = createGalleryCards(data.hits);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtn.enable();
    })
    .catch(error => console.log(error));
}

function onLoadMoreBtnClick(event) {
  pixabayAPI.page += 1;

  loadMoreBtn.disable();

  pixabayAPI
    .fetchPhotosByQuery()
    .then(({ data }) => {
      console.log(data);
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createGalleryCards(data.hits)
      );
    })
    .catch(error => console.log(error));

  loadMoreBtn.enable();
}
