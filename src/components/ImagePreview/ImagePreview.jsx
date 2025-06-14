/* eslint-disable */
import { useState } from "react";
import styles from "./ImagePreview.module.css";

const ImagePreview = ({ currentImageUrl, selectedImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      onImageChange(e);
    }
  };

  return (
    <div className={styles.imagePreviewContainer}>
      <div className={styles.imageWrapper}>
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
        ) : currentImageUrl ? (
          <img
            src={`http://localhost:5000/${currentImageUrl}`}
            alt="Current"
            className={styles.previewImage}
          />
        ) : (
          <div className={styles.noImage}>
            <span>No Image</span>
          </div>
        )}
      </div>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
      />
      <label htmlFor="image" className={styles.uploadButton}>
        {currentImageUrl || previewUrl ? "Change Image" : "Upload Image"}
      </label>
    </div>
  );
};

export default ImagePreview;
