import { Notify } from 'notiflix';
import { PixabayAPI } from './pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
const lightboxGallery = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  const searchFormInputValue =
    event.currentTarget.elements.searchQuery.value.trim();

  if (searchFormInputValue === '') {
    refs.gallery.innerHTML = '';
    loadMoreBtn.hide();
    Notify.failure('Please fill out the search field!');
    return;
  }

  loadMoreBtn.hide();
  pixabayAPI.page = 1;
  pixabayAPI.query = searchFormInputValue;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    if (data.totalHits === 0) {
      refs.gallery.innerHTML = '';
      loadMoreBtn.hide();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (pixabayAPI.perPage >= data.totalHits) {
      loadMoreBtn.hide();
    }

    if (data.totalHits > pixabayAPI.perPage) {
      loadMoreBtn.show();
      loadMoreBtn.disable();

      setTimeout(() => {
        loadMoreBtn.enable();
      }, 1500);
    }

    refs.gallery.innerHTML = createGalleryCards(data.hits);
    new SimpleLightbox('.gallery a');
    setSmoothScroll();
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtnClick(event) {
  pixabayAPI.page += 1;
  loadMoreBtn.disable();

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    console.log(data);

    refs.gallery.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
    lightboxGallery.refresh();
    setSmoothScroll();

    setTimeout(() => {
      loadMoreBtn.enable();
    }, 1250);

    if (pixabayAPI.page * pixabayAPI.perPage >= data.totalHits) {
      loadMoreBtn.hide();
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function setSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
