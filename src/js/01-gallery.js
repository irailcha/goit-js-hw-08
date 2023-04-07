import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);
const galleryContainer=document.querySelector('.gallery');


function createGalleryItemsList(galleryItems) {
    return galleryItems.map(item => {
      const { preview, original, description } = item;
      return `
      <li class="gallery__item">
      <a class="gallery__link" href="${original}">
         <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
   </li>
      `;
    }).join('');
  }

  const galleryMarkUp=createGalleryItemsList(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkUp);




const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData:'alt'
  });




