import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddCourt.module.css";
import { fetchFacilities } from "../../../store/slices/facilities/thunk";
import { fetchSports } from "../../../store/slices/sports/thunk";
import { addCourt } from "../../../store/slices/courts/thunk";

const AddCourt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { facilities } = useSelector((state) => state.facilitiesSlice);
  const { sports } = useSelector((state) => state.sportsSlice);

  const [formData, setFormData] = useState({
    name: "",
    facilityId: "",
    sportId: "",
    capacity: "",
    pricePerHour: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchFacilities());
    dispatch(fetchSports());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (field === "name") {
        if (!value || value.length < 2 || value.length > 20) {
          newErrors.name = "Name must be between 2 and 20 characters";
        } else {
          delete newErrors.name;
        }
      }

      if (field === "facilityId") {
        if (!value) {
          newErrors.facilityId = "Facility is required";
        } else {
          delete newErrors.facilityId;
        }
      }

      if (field === "sportId") {
        if (!value) {
          newErrors.sportId = "Sport is required";
        } else {
          delete newErrors.sportId;
        }
      }

      if (field === "capacity") {
        if (!value || value < 1 || value > 10) {
          newErrors.capacity = "Capacity must be between 1 and 10";
        } else {
          delete newErrors.capacity;
        }
      }

      if (field === "pricePerHour") {
        if (!value || value < 1 || value > 500) {
          newErrors.pricePerHour = "Price must be between 1 and 500";
        } else {
          delete newErrors.pricePerHour;
        }
      }

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 20
    ) {
      newErrors.name = "Name must be between 2 and 20 characters";
    }

    if (!formData.facilityId) {
      newErrors.facilityId = "Facility is required";
    }

    if (!formData.sportId) {
      newErrors.sportId = "Sport is required";
    }

    if (!formData.capacity || formData.capacity < 1 || formData.capacity > 10) {
      newErrors.capacity = "Capacity must be between 2 and 10";
    }

    if (
      !formData.pricePerHour ||
      formData.pricePerHour < 1 ||
      formData.pricePerHour > 500
    ) {
      newErrors.pricePerHour = "Price must be between 2 and 500";
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
      const response = await dispatch(addCourt(formData)).unwrap();
      if (response) {
        toast.success("Court added successfully!");
        navigate("/courts");
      }
    } catch (error) {
      toast.error(error || "Failed to add court");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Court Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? styles.error : ""}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="facilityId">Facility</label>
            <select
              id="facilityId"
              name="facilityId"
              value={formData.facilityId}
              onChange={handleInputChange}
              className={errors.facilityId ? styles.error : ""}
            >
              <option value="">Select Facility</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
            {errors.facilityId && (
              <span className={styles.errorText}>{errors.facilityId}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sportId">Sport</label>
            <select
              id="sportId"
              name="sportId"
              value={formData.sportId}
              onChange={handleInputChange}
              className={errors.sportId ? styles.error : ""}
            >
              <option value="">Select Sport</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
            {errors.sportId && (
              <span className={styles.errorText}>{errors.sportId}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className={errors.capacity ? styles.error : ""}
              min="1"
            />
            {errors.capacity && (
              <span className={styles.errorText}>{errors.capacity}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="pricePerHour">Price Per Hour</label>
            <input
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={handleInputChange}
              className={errors.pricePerHour ? styles.error : ""}
              min="0"
              step="0.01"
            />
            {errors.pricePerHour && (
              <span className={styles.errorText}>{errors.pricePerHour}</span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Court
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourt;
