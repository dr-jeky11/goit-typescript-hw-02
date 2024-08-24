import s from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  const handleClick = () => {
    openModal(image);
  };
  return (
    <div className={s.container} onClick={handleClick}>
      <img src={image.urls.small} alt={image.description} className={s.img} />
    </div>
  );
}
