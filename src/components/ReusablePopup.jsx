/* eslint-disable */
import "./ReusablePopup.css";

const ReusablePopup = ({
  isOpen,
  onClose,
  text,
  buttonText,
  onButtonClick,
  buttonClassName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p className="popup-text">{text}</p>
        <div>
          <button
            className={`popup-button ${buttonClassName || ""}`}
            onClick={onButtonClick}
            style={{ margin: "4px" }}
          >
            {buttonText}
          </button>

          <button
            className={`popup-button ${buttonClassName || ""}`}
            style={{ margin: "4px", backgroundColor: "red" }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusablePopup;
