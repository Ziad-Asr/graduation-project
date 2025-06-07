import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import styles from "./Courts.module.css";
import { fetchCourts } from "./../../../store/slices/courts/thunk";

const Courts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courts } = useSelector((state) => state.courtsSlice);

  useEffect(() => {
    dispatch(fetchCourts());
  }, [dispatch]);

  const columns = [
    {
      name: "Court Name",
      selector: (row) => row?.name,
      sortable: true,
      center: true,
    },
    {
      name: "Facility ID",
      selector: (row) => row.facilityId,
      sortable: true,
      center: true,
    },
    {
      name: "Sport ID",
      selector: (row) => row.sportId,
      sortable: true,
      center: true,
    },
    {
      name: "Capacity",
      selector: (row) => row?.capacity,
      sortable: true,
      center: true,
    },
    {
      name: "Price Per Hour",
      selector: (row) => `$${row?.pricePerHour}`,
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
            navigate(`/courts/edit/${row.id}`);
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
    <div className={styles["courts-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Courts</h1>
        <button
          className={styles["add-button"]}
          onClick={() => navigate("/courts/add")}
        >
          Add New Court
        </button>
      </div>

      <div className={styles["courts-content"]}>
        <DataTable
          columns={columns}
          data={courts}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15]}
          customStyles={customStyles}
          highlightOnHover
          noDataComponent={<div className="no-data">No courts found</div>}
        />
      </div>
    </div>
  );
};

export default Courts;
