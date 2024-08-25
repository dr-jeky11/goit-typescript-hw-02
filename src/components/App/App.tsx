import { useEffect, useState, ReactElement } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchPhotos } from "../../unsplash-api";
import { Image, ModalData } from "../../types";

import s from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const notify: () => void = () =>
  toast.error("There are no photos yet", {
    duration: 2000,
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });

const notifyWhenAddedToFav: () => void = () =>
  toast.success("Successfully toasted!");

export default function App(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [photos, setPhotos] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>(null);

  const [favorites, setFavorites] = useState<Image[]>([]);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);

  const getImages = (query: string): void => {
    setPhotos([]);
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const handleAddToFav = (newFav: Image): void => {
    setFavorites((prevFav: Image[]) => {
      return [...prevFav, newFav];
    });
    notifyWhenAddedToFav();
  };

  const handleShowFav = (): void => {
    setPhotos(favorites);
    setIsFavOpen(true);
    if (photos.length === 0) {
      notify();
      return;
    }
  };

  const openModal = (image: Image): void => {
    setModalData(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchImg() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchPhotos(searchQuery, currentPage);

        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data.results];
        });

        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery, currentPage]);

  return (
    <div className={s.container}>
      <SearchBar onSearch={getImages} onShowFav={handleShowFav} />
      <main>
        {photos.length > 0 && (
          <ImageGallery openModal={openModal} images={photos} />
        )}
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {photos.length > 0 &&
          !loading &&
          currentPage < totalPages &&
          !error &&
          !isFavOpen && <LoadMoreBtn onAddMore={handleLoadMore} />}
      </main>

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onSetModal={setIsModalOpen}
          imageData={modalData}
          onAddToFav={handleAddToFav}
        />
      )}
      <Toaster containerStyle={{ top: 50 }} reverseOrder={false} />
    </div>
  );
}
