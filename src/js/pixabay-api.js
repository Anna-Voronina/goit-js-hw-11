import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '37076691-e6e6e52c23a6009a52c216588';

  constructor() {
    this.page = null;
    this.query = null;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      key: PixabayAPI.API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    return axios.get(`${PixabayAPI.BASE_URL}?${searchParams}`);
  }
}
