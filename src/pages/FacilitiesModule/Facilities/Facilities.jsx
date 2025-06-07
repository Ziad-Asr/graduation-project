import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { fetchFacilities } from "../../../store/slices/facilities/thunk";
import Map from "../../../components/map/Map";
import { FaEdit } from "react-icons/fa";
import styles from "./Facilities.module.css";

const Facilities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { facilities } = useSelector((state) => state?.facilitiesSlice);

  useEffect(() => {
    dispatch(fetchFacilities());
  }, [dispatch]);

  const facilityLocations =
    facilities
      ?.filter(
        (facility) =>
          facility?.address?.latitude && facility?.address?.longitude
      )
      .map((facility) => ({
        id: facility?.id,
        position: [facility?.address?.latitude, facility?.address?.longitude],
        name: facility?.name,
      })) || [];

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div className={styles.imageContainer}>
          {row.imageUrl ? (
            <img
              src={`http://localhost:5000/${row.imageUrl}`}
              alt={row?.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div className={styles.noImage}>
              <span>No Image</span>
            </div>
          )}
        </div>
      ),
      center: true,
    },
    {
      name: "Facility Name",
      selector: (row) => row?.name,
      sortable: true,
      center: true,
    },
    {
      name: "Owner ID",
      selector: (row) => row?.ownerId,
      sortable: true,
      center: true,
    },
    {
      name: "City",
      selector: (row) => row?.address?.city,
      sortable: true,
      center: true,
    },
    {
      name: "Street Address",
      selector: (row) => row?.address?.streetAddress,
      sortable: true,
      center: true,
    },
    {
      name: "Opening Time",
      selector: (row) => row?.openingTime,
      sortable: true,
      center: true,
    },
    {
      name: "Closing Time",
      selector: (row) => row?.closingTime,
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
            navigate(`/facilities/edit/${row.id}`);
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
    <div className={styles["facilities-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Facilities</h1>
        <button
          className={styles["add-button"]}
          onClick={() => navigate("/facilities/add")}
        >
          Add New Facility
        </button>
      </div>

      <div className={styles["facilities-content"]}>
        <Map locations={facilityLocations} />
        <DataTable
          columns={columns}
          data={facilities}
          pagination
          customStyles={customStyles}
          highlightOnHover
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15]}
          noDataComponent={<div className="no-data">No facilities found</div>}
        />
      </div>
    </div>
  );
};

export default Facilities;
