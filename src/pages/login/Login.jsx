import { useState } from "react";
import logo from "../../assets/logo.png";
import loginImages from "../../assets/login_image.png";
import { BiSolidHide, BiShow } from "react-icons/bi";
import styles from "./Login.module.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checkboxLabel, setCheckboxLabel] = useState("app admin");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleCheckboxLabel = () => {
    setCheckboxLabel((prev) =>
      prev === "app admin" ? "Playground owner" : "app admin"
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form["email"].value;
    const password = form["password"].value;

    console.log({ email: email, password: password });
  };

  return (
    <div className={styles.login}>
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
                  <BiShow size={"30px"} />
                ) : (
                  <BiSolidHide size={"30px"} />
                )}
              </span>
            </div>

            <div className={styles.checkbox_wrapper}>
              <label className={styles.checkbox_label}>
                Login as{" "}
                <span onClick={toggleCheckboxLabel}>{checkboxLabel}</span>
              </label>
              <input type="checkbox" className={styles.checkbox} />
            </div>

            <button type="submit" className={styles.submit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
