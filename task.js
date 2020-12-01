import gallery from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
    modalImage: document.querySelector('.lightbox__image'),
    modalCloseBtn: document.querySelector('[data-action="close-lightbox"]')
}

const makeMarkup =
    gallery.reduce((acc, item) => {
        acc += `<li class="gallery__item">
    <a class="gallery__link" href="${item.preview}">
        <img class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
        /> </a> </li>`
        return acc
    }, '')

refs.gallery.insertAdjacentHTML('afterbegin', makeMarkup)
refs.gallery.addEventListener('click', GalleryClick)
refs.modalCloseBtn.addEventListener('click', closeModal)
refs.modalOverlay.addEventListener('click', Overlay)

function GalleryClick(event) {
    event.preventDefault()
    if (event.target.nodeName !== 'IMG') { return }
    openModal()
    refs.modalImage.src = event.target.dataset.source
    refs.modalImage.alt = event.target.alt
}

function openModal() {
    refs.modal.classList.add('is-open')

    window.addEventListener('keydown', escBtnPress)
}

function closeModal() {
    refs.modal.classList.remove('is-open');
    window.removeEventListener('keydown', escBtnPress)
    refs.modalImage.src = '';
    refs.modalImage.alt = ''
}

function Overlay(event) {
    if (event.currentTarget === event.target) { closeModal() }
}

function escBtnPress(event) {
    if (event.code === 'Escape') { closeModal() }
}