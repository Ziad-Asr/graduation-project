import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/login/thunk";
import { useNavigate } from "react-router-dom";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import loginImages from "../../assets/login_image.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checkboxLabel, setCheckboxLabel] = useState("app admin");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLoginResponseInfo, loading, error } = useSelector(
    (state) => state.login || {}
  );

  console.log("userLoginResponseInfo", userLoginResponseInfo);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleCheckboxLabel = () => {
    setCheckboxLabel((prev) =>
      prev === "app admin" ? "Playground owner" : "app admin"
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form["email"].value;
    const password = form["password"].value;

    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        toast.success("Logged in successfully!");
        navigate("/playgrounds-owners");
      } else {
        toast.error(result.payload || "Login failed!");
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.overlay}></div>
      <div className={styles.left_div}>
        <img src={loginImages} alt="login" className={styles.login_images} />
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

        <h3 className={styles.login_title}>
          Login as
          {checkboxLabel === "app admin" ? " Playground Owner" : " Admin"}
        </h3>

        {checkboxLabel === "app admin" && (
          <div className={styles.button_wrapper}>
            <button className={`${styles.toggle_button} ${styles.active}`}>
              Login
            </button>
            <button
              className={styles.toggle_button}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}

        <div className={styles.form_wrapper}>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={styles.input}
              required
            />
            <div className={styles.password_wrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                className={styles.input}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className={styles.password_toggle_icon}
              >
                {passwordVisible ? (
                  <BiShow size={30} />
                ) : (
                  <BiSolidHide size={30} />
                )}
              </span>
            </div>

            <div className={styles.checkbox_wrapper}>
              <label className={styles.checkbox_label}>
                Login as{" "}
                <span onClick={toggleCheckboxLabel}>{checkboxLabel}</span>
              </label>
            </div>

            {error && <p className={styles.error_message}>{error}</p>}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
