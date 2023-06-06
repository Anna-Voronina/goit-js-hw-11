export class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    if (hidden) {
      this.hide();
    }
  }

  getRefs(selector) {
    const refs = {};

    refs.button = document.querySelector(selector);
    refs.label = document.querySelector('.btn-label');
    refs.loader = document.querySelector('.loader');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more';
    this.refs.loader.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading...';
    this.refs.loader.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
