import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSport } from "../store/slices/sports/thunk";
import styles from "./AddSport.module.css";

const AddSport = () => {
  const [sportName, setSportName] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (value) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!value || value.length < 2 || value.length > 20) {
        newErrors.sportName = "Sport name must be between 2 and 20 characters";
      } else {
        delete newErrors.sportName;
      }
      return newErrors;
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSportName(value);
    validateField(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!sportName || sportName.length < 2 || sportName.length > 20) {
      newErrors.sportName = "Sport name must be between 2 and 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const response = await dispatch(addSport(sportName)).unwrap();
      if (response) {
        toast.success("Sport added successfully!");
        navigate("/sports");
      }
    } catch (error) {
      toast.error(error || "Failed to add sport");
    }
  };

  return (
    <div className={styles["add-sport-container"]}>
      <div className={styles["add-sport-content"]}>
        <h1>Add New Sport</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="sportName">Sport Name</label>
            <input
              type="text"
              id="sportName"
              value={sportName}
              onChange={handleInputChange}
              className={errors.sportName ? styles.error : ""}
              maxLength={20}
            />
            {errors.sportName && (
              <span className={styles["error-message"]}>
                {errors.sportName}
              </span>
            )}
          </div>
          <div className={styles["button-group"]}>
            <button type="submit" className={styles["submit-button"]}>
              Add Sport
            </button>
            <button
              type="button"
              className={styles["cancel-button"]}
              onClick={() => navigate("/sports")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSport;
