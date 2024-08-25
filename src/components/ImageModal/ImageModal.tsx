import Modal from "react-modal";
import { Image, ModalData } from "../../types";
import { RiCloseLargeFill, RiStarLine, RiStarFill } from "react-icons/ri";

import { formatDate } from "../../helpers/formDate";

import s from "./ImageModal.module.css";
import { useState, ReactElement } from "react";

interface Props {
  isOpen: boolean;
  onSetModal: (boolean: boolean) => void;
  onAddToFav: (image: Image) => void;
  imageData: ModalData;
}
export default function ImageModal({
  isOpen,
  onSetModal,
  onAddToFav,
  imageData,
}: Props): ReactElement | null {
  if (!imageData) {
    return null;
  }
  const {
    created_at,
    description,
    urls,
    links: { download },
    likes,
    tags,
    user: { name, location },
    alt_description,
  } = imageData;

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.65)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#F0F0F0",
    },
  };

  const onCloseModal = (): void => {
    onSetModal(false);
  };

  const handleBodyClassRemove = (): void => {
    document.body.classList.remove("ReactModal__Body--open");
  };

  const handleAddToFav = () => {
    if (isAdded) {
      setIsAdded(false);
      return;
    }
    onAddToFav(imageData);
    setIsAdded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
      className={s.modal}
      contentLabel="Image Modal window"
      preventScroll={true}
      onAfterClose={handleBodyClassRemove}>
      <div className={s.content}>
        <div className={s.btnGroup}>
          <button type="button" className={s.favBtn} onClick={handleAddToFav}>
            {isAdded ? (
              <RiStarFill size={28} color="darkblue" />
            ) : (
              <RiStarLine size={28} />
            )}
          </button>

          <button className={s.btn} onClick={onCloseModal} type="button">
            <RiCloseLargeFill size={28} />
          </button>
        </div>

        <img className={s.img} src={urls.regular} alt={alt_description} />

        <div className={s.infoListAndLink}>
          <ul className={s.infoWrapper}>
            <li className="imageInfo">
              <p className={s.imageInfoHeading}>Likes</p>
              <span className={s.imageInfo}>{likes}</span>
            </li>

            <li className="imageInfo">
              <p className={s.imageInfoHeading}>Featured in</p>
              <ul className={s.featuredIn}>
                {tags.map((el, i) => (
                  <li key={i}>
                    <span className={s.imageInfo}> {el.title}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <a
            href={download}
            rel="noreferrer noopener"
            target="_blank"
            download
            className={s.download}
            type="button">
            Download
          </a>
        </div>
        <p className={s.description}>{description}</p>

        <div className={s.userInfo}>
          <div>
            <p className={s.name}>{name}</p>
            <p>{location}</p>
          </div>
          <p className={s.date}>{formatDate(created_at)}</p>
        </div>
      </div>
    </Modal>
  );
}
