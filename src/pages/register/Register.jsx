import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import loginImages from "../../assets/login_image.png";
import { BiSolidHide, BiShow } from "react-icons/bi";
import styles from "./Register.module.css";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form["email"].value;
    const password = form["password"].value;
    console.log({ email, password });
  };

  return (
    <div className={styles.register}>
      <div className={styles.overlay}></div>
      <div className={styles.left_div}>
        <img
          src={loginImages}
          alt="register"
          className={styles.register_images}
        />
        <div className={styles.left_text}>
          Join us and manage <br />
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

        <h3 className={styles.login_title}>Login as Playground owner</h3>

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
            <button type="submit" className={styles.submit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
