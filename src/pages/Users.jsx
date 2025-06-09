import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import styles from "./Users.module.css";
import { fetchUsers } from "../store/slices/users/thunk";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.usersSlice);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber || "N/A",
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
            navigate(`/users/edit/${row.id}`);
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
    <div className={styles["users-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Users</h1>
        <button
          className={styles["add-button"]}
          onClick={() => navigate("/users/add")}
        >
          Add New User
        </button>
      </div>

      <div className={styles["users-content"]}>
        {loading ? (
          <div className={styles.loading}>Loading users...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={users || []}
            pagination
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6, 10, 15]}
            customStyles={customStyles}
            highlightOnHover
            noDataComponent={
              <div className={styles.noData}>No users found</div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Users;
