import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { toast } from "react-toastify";
import { fetchPlaygroundOwners } from "../../../store/slices/playgroundOwners/thunk";
import {
  fetchFacilityById,
  updateFacility,
} from "../../../store/slices/facilities/thunk";
import ImagePreview from "../../../components/ImagePreview/ImagePreview";
import styles from "./EditFacility.module.css";

const EditFacility = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { owners } = useSelector((state) => state.playgroundOwnersSlice);
  const { currentFacility, loading } = useSelector(
    (state) => state.facilitiesSlice
  );

  const [formData, setFormData] = useState({
    name: "",
    openingTime: "",
    closingTime: "",
    ownerId: "",
    address: {
      streetAddress: "",
      city: "",
      latitude: null,
      longitude: null,
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchPlaygroundOwners());
    dispatch(fetchFacilityById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentFacility) {
      setFormData({
        name: currentFacility.name,
        openingTime: currentFacility.openingTime,
        closingTime: currentFacility.closingTime,
        ownerId: currentFacility.ownerId,
        address: {
          streetAddress: currentFacility.address.streetAddress,
          city: currentFacility.address.city,
          latitude: currentFacility.address.latitude,
          longitude: currentFacility.address.longitude,
        },
      });
      setCurrentImageUrl(currentFacility.imageUrl);
    }
  }, [currentFacility]);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            latitude: lat,
            longitude: lng,
          },
        }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.location;
          return newErrors;
        });
      },
    });
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
      validateField(parent, child, value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      validateField(name, null, value);
    }
  };

  const validateField = (field, subField, value) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (field === "name") {
        if (!value || value.length < 2 || value.length > 10) {
          newErrors.name = "Name must be between 2 and 10 characters";
        } else {
          delete newErrors.name;
        }
      }

      if (field === "openingTime") {
        if (!value) {
          newErrors.openingTime = "Opening time is required";
        } else {
          delete newErrors.openingTime;
        }
      }

      if (field === "closingTime") {
        if (!value) {
          newErrors.closingTime = "Closing time is required";
        } else {
          delete newErrors.closingTime;
        }
      }

      if (field === "ownerId") {
        if (!value) {
          newErrors.ownerId = "Owner is required";
        } else {
          delete newErrors.ownerId;
        }
      }

      if (field === "address") {
        if (subField === "streetAddress") {
          if (!value || value.length < 1 || value.length > 10) {
            newErrors.streetAddress =
              "Street address must be between 1 and 10 characters";
          } else {
            delete newErrors.streetAddress;
          }
        }
        if (subField === "city") {
          if (!value || value.length < 1 || value.length > 10) {
            newErrors.city = "City must be between 1 and 10 characters";
          } else {
            delete newErrors.city;
          }
        }
      }

      return newErrors;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 10
    ) {
      newErrors.name = "Name must be between 2 and 10 characters";
    }

    if (!formData.openingTime) {
      newErrors.openingTime = "Opening time is required";
    }

    if (!formData.closingTime) {
      newErrors.closingTime = "Closing time is required";
    }

    if (!formData.ownerId) {
      newErrors.ownerId = "Owner is required";
    }

    if (
      !formData.address.streetAddress ||
      formData.address.streetAddress.length < 1 ||
      formData.address.streetAddress.length > 10
    ) {
      newErrors.streetAddress =
        "Street address must be between 1 and 10 characters";
    }

    if (
      !formData.address.city ||
      formData.address.city.length < 1 ||
      formData.address.city.length > 10
    ) {
      newErrors.city = "City must be between 1 and 10 characters";
    }

    if (!formData.address.latitude || !formData.address.longitude) {
      newErrors.location = "Please select a location on the map";
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

    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("openingTime", formData.openingTime);
    formDataToSend.append("closingTime", formData.closingTime);
    formDataToSend.append("ownerId", formData.ownerId);
    formDataToSend.append(
      "address.streetAddress",
      formData.address.streetAddress
    );
    formDataToSend.append("address.city", formData.address.city);
    formDataToSend.append("address.latitude", formData.address.latitude);
    formDataToSend.append("address.longitude", formData.address.longitude);
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    try {
      const response = await dispatch(
        updateFacility({ id, formData: formDataToSend })
      ).unwrap();
      if (response?.status === 200) {
        toast.success("Facility updated successfully!");
        navigate("/facilities");
      } else {
        toast.error(response || "Failed to update facility", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mapContainer}>
          <MapContainer
            center={[30.0339, 31.2336]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            {formData.address.latitude && formData.address.longitude && (
              <Marker
                position={[
                  formData.address.latitude,
                  formData.address.longitude,
                ]}
              />
            )}
          </MapContainer>
          {errors.location && (
            <span className={styles.errorText} style={{ fontSize: "22px" }}>
              {errors.location}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Facility Name</label>
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
            <label htmlFor="openingTime">Opening Time</label>
            <input
              type="time"
              id="openingTime"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleInputChange}
              className={errors.openingTime ? styles.error : ""}
            />
            {errors.openingTime && (
              <span className={styles.errorText}>{errors.openingTime}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="closingTime">Closing Time</label>
            <input
              type="time"
              id="closingTime"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleInputChange}
              className={errors.closingTime ? styles.error : ""}
            />
            {errors.closingTime && (
              <span className={styles.errorText}>{errors.closingTime}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ownerId">Owner</label>
            <select
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleInputChange}
              className={errors.ownerId ? styles.error : ""}
            >
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.firstName} {owner.lastName}
                </option>
              ))}
            </select>
            {errors.ownerId && (
              <span className={styles.errorText}>{errors.ownerId}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="address.streetAddress"
              value={formData.address.streetAddress}
              onChange={handleInputChange}
              className={errors.streetAddress ? styles.error : ""}
            />
            {errors.streetAddress && (
              <span className={styles.errorText}>{errors.streetAddress}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className={errors.city ? styles.error : ""}
            />
            {errors.city && (
              <span className={styles.errorText}>{errors.city}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Facility Image</label>
            <ImagePreview
              currentImageUrl={currentImageUrl}
              onImageChange={handleImageChange}
            />
            {errors.image && (
              <span className={styles.errorText}>{errors.image}</span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Update Facility
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFacility;
