import ImageCard from "../ImageCard/ImageCard";

import s from "./ImageGallery.module.css";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={s.list}>
      {images.map((image) => {
        return (
          <li key={image.id} className={s.item}>
            <ImageCard openModal={openModal} image={image} />
          </li>
        );
      })}
    </ul>
  );
}
