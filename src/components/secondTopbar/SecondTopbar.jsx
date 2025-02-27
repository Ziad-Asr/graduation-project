import { GrFormAdd } from "react-icons/gr";
import styles from "./SecondTopbar.module.css";

const SecondTopbar = () => {
  return (
    <div className={styles["second-topbar"]}>
      <div className={styles["topbar-right-content"]}>
        <div className={styles["section"]}>
          <div className={styles.products}>
            <div
              className={styles["add-text"]}
              //   onClick={onAddBranchClick}
            >
              <span>Add</span>
            </div>
          </div>
          <div
            className={styles["add-icon"]}
            //   onClick={onAddBranchClick}
          >
            <GrFormAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondTopbar;
