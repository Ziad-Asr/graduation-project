import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import loginImages from "../../assets/login_image.png";
import { BiSolidHide, BiShow } from "react-icons/bi";
import styles from "./Register.module.css";
import { register } from "../../store/slices/login/thunk";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerLoading } = useSelector((state) => state.loginSlice);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible((prevState) => !prevState);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prevState) => !prevState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
      setShowSuccessPopup(true);
    } catch (error) {
      toast.error(error);
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className={styles.register}>
        <div className={styles.overlay}></div>
        <div className={styles.left_div}>
          <img
            src={loginImages}
            alt="register"
            className={styles.register_images}
          />
          <div className={styles.left_text}>
            One platform for managing <br />
            <span className={styles.left_bold_text}>
              all manufacturing aspects
            </span>
          </div>
        </div>
        <div className={styles.right_div}>
          <div className={styles.right_logo}>
            <img src={logo} alt="logo" className={styles.logo_image} />
            <div className={styles.logo_text}>Perfect</div>
          </div>

          <h3 className={styles.login_title}>Create an Account</h3>

          <div className={styles.button_wrapper}>
            <button
              className={styles.toggle_button}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button className={`${styles.toggle_button} ${styles.active}`}>
              Register
            </button>
          </div>

          <div className={styles.form_wrapper}>
            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`${styles.input} ${
                  errors.firstName ? styles.input_error : ""
                }`}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <span className={styles.error_text}>{errors.firstName}</span>
              )}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`${styles.input} ${
                  errors.lastName ? styles.input_error : ""
                }`}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <span className={styles.error_text}>{errors.lastName}</span>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`${styles.input} ${
                  errors.email ? styles.input_error : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className={styles.error_text}>{errors.email}</span>
              )}

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className={`${styles.input} ${
                  errors.phoneNumber ? styles.input_error : ""
                }`}
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && (
                <span className={styles.error_text}>{errors.phoneNumber}</span>
              )}

              <div className={styles.password_wrapper}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`${styles.input} ${
                    errors.password ? styles.input_error : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("password")}
                  className={styles.password_toggle_icon}
                >
                  {passwordVisible ? (
                    <BiShow size={"30px"} />
                  ) : (
                    <BiSolidHide size={"30px"} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className={styles.error_text}>{errors.password}</span>
              )}

              <div className={styles.password_wrapper}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`${styles.input} ${
                    errors.confirmPassword ? styles.input_error : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className={styles.password_toggle_icon}
                >
                  {confirmPasswordVisible ? (
                    <BiShow size={"30px"} />
                  ) : (
                    <BiSolidHide size={"30px"} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className={styles.error_text}>
                  {errors.confirmPassword}
                </span>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={registerLoading}
              >
                {registerLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <SuccessPopup
          message="We collected your data successfully, and we'll contact you in 24 hours."
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Register;
