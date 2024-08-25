import ImageCard from "../ImageCard/ImageCard";
import { ReactElement } from "react";
import { Image } from "../../types";

import s from "./ImageGallery.module.css";

interface Props {
  images: Image[];
  openModal: (image: Image) => void;
}

export default function ImageGallery({
  images,
  openModal,
}: Props): ReactElement {
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
