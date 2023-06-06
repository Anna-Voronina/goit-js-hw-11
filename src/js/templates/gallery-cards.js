/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */

export const createGalleryCards = photoCards => {
  const photoCardsArr = photoCards.map(photoCard => {
    return `<div class="photo-card">
  <img src="${photoCard.webformatURL}" alt="${photoCard.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${photoCard.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${photoCard.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${photoCard.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${photoCard.downloads}</span>
    </p>
  </div>
</div>`;
  });

  return photoCardsArr.join('');
};
