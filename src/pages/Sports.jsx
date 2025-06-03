import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { fetchSports } from "../store/slices/sports/thunk";
import { FaEdit } from "react-icons/fa";
import styles from "./Sports.module.css";

const Sports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sports } = useSelector((state) => state.sportsSlice);

  useEffect(() => {
    dispatch(fetchSports());
  }, [dispatch]);

  const columns = [
    {
      name: "Sport Name",
      selector: (row) => row?.name,
      sortable: true,
      center: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <FaEdit
          className={styles.editIcon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/sports/edit/${row.id}`);
          }}
        />
      ),
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontWeight: "bold",
        fontSize: "15px",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
      },
    },
  };

  return (
    <div className={styles["sports-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Sports</h1>
        <button
          className={styles["add-button"]}
          onClick={() => navigate("/sports/add")}
        >
          Add New Sport
        </button>
      </div>

      <div className={styles["sports-content"]}>
        <DataTable
          columns={columns}
          data={sports}
          pagination
          customStyles={customStyles}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Sports;
