import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
