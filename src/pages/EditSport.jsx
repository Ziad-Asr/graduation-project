import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateSport } from "../store/slices/sports/thunk";
import styles from "./EditSport.module.css";

const EditSport = () => {
  const [sportName, setSportName] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { sports } = useSelector((state) => state.sportsSlice);

  useEffect(() => {
    const sport = sports.find((s) => s.id === parseInt(id));
    if (sport) {
      setSportName(sport.name);
    } else {
      navigate("/sports");
    }
  }, [id, sports, navigate]);

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
      const response = await dispatch(
        updateSport({ id: parseInt(id), name: sportName })
      ).unwrap();
      if (response) {
        toast.success("Sport updated successfully!");
        navigate("/sports");
      }
    } catch (error) {
      toast.error(error || "Failed to update sport");
    }
  };

  return (
    <div className={styles["edit-sport-container"]}>
      <div className={styles["edit-sport-content"]}>
        <h1>Edit Sport</h1>
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
              Update Sport
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

export default EditSport;
