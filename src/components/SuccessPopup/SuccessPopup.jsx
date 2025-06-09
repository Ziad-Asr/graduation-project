import { useEffect } from "react";
import styles from "./SuccessPopup.module.css";

const SuccessPopup = ({ message, onClose }) => {
  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        <div className={styles.content}>
          <div className={styles.icon}>✓</div>
          <p className={styles.message}>{message}</p>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessPopup;
