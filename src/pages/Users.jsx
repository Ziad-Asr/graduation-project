import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchUsers } from "../store/slices/users/thunk";

const Users = () => {
  const dispatch = useDispatch();
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
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
        minHeight: "50px",
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
    <div className="container">
      {loading ? (
        <div
          style={{
            color: "black",
            fontSize: "16px",
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "bold",
          }}
        >
          Loading users...
        </div>
      ) : error ? (
        <div
          style={{
            color: "red",
            fontSize: "16px",
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      ) : (
        <DataTable
          title="Users List"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          columns={columns}
          data={users || []}
          customStyles={customStyles}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          paginationPerPage={10}
          noDataComponent={
            <div
              style={{
                color: "black",
                fontSize: "16px",
                textAlign: "center",
                margin: "20px 0",
                fontWeight: "bold",
              }}
            >
              No users found
            </div>
          }
        />
      )}
    </div>
  );
};

export default Users;
