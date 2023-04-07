import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer=document.querySelector('.gallery');


function createGalleryItemsList(galleryItems) {
    return galleryItems.map(item => {
      const { preview, original, description } = item;
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              data-alt="${description}"
            />
          </a>
        </li>
      `;
    }).join('');
  }

  const galleryMarkUp=createGalleryItemsList(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkUp);


function onGalleryContainerClick(event) {
  event.preventDefault();

  const {dataset:{source}}=event.target;
if (!source) {return;
}
const instance= basicLightbox.create(`
    <div class="modal">
      <img src="${source}", width="640px" />
      <a>Close</a> </div>`, {
    onShow: (instance) =>{
      const onKeyDown=(event) => {
        if (event.key=== 'Escape') {
          instance.close();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      instance.element().querySelector('a').onclick = instance.close;
    },
    onClose: (instance) => {
      const onKeyDown= (event) => {
        if (event.key=== 'Escape') {
          instance.close();
        }
      };
      document.removeEventListener('keydown', onKeyDown);
    }
  });

  instance.show();
}

galleryContainer.addEventListener('click', onGalleryContainerClick);


