import DataTable from "react-data-table-component";
import "./Users.css";

const users = [
  {
    name: "Ahmed Ali",
    age: 30,
    email: "ahmed.ali@example.com",
    phone: "+20 1012345678",
    city: "Cairo",
  },
  {
    name: "Sara Hassan",
    age: 25,
    email: "sara.hassan@example.com",
    phone: "+20 1023456789",
    city: "Alexandria",
  },
  {
    name: "Omar Khaled",
    age: 35,
    email: "omar.khaled@example.com",
    phone: "+20 1034567890",
    city: "Giza",
  },
  {
    name: "Nour Mohamed",
    age: 28,
    email: "nour.mohamed@example.com",
    phone: "+20 1045678901",
    city: "Luxor",
  },
  {
    name: "Hassan Ibrahim",
    age: 40,
    email: "hassan.ibrahim@example.com",
    phone: "+20 1056789012",
    city: "Aswan",
  },
  {
    name: "Mona Adel",
    age: 22,
    email: "mona.adel@example.com",
    phone: "+20 1067890123",
    city: "Port Said",
  },
  {
    name: "Kareem Mostafa",
    age: 33,
    email: "kareem.mostafa@example.com",
    phone: "+20 1078901234",
    city: "Mansoura",
  },
  {
    name: "Yasmin Samir",
    age: 27,
    email: "yasmin.samir@example.com",
    phone: "+20 1089012345",
    city: "Suez",
  },
  {
    name: "Tamer Hussein",
    age: 38,
    email: "tamer.hussein@example.com",
    phone: "+20 1090123456",
    city: "Tanta",
  },
  {
    name: "Dina Amr",
    age: 29,
    email: "dina.amr@example.com",
    phone: "+20 1101234567",
    city: "Ismailia",
  },
  {
    name: "Ahmed Ali",
    age: 30,
    email: "ahmed.ali@example.com",
    phone: "+20 1012345678",
    city: "Cairo",
  },
  {
    name: "Sara Hassan",
    age: 25,
    email: "sara.hassan@example.com",
    phone: "+20 1023456789",
    city: "Alexandria",
  },
  {
    name: "Omar Khaled",
    age: 35,
    email: "omar.khaled@example.com",
    phone: "+20 1034567890",
    city: "Giza",
  },
  {
    name: "Nour Mohamed",
    age: 28,
    email: "nour.mohamed@example.com",
    phone: "+20 1045678901",
    city: "Luxor",
  },
  {
    name: "Hassan Ibrahim",
    age: 40,
    email: "hassan.ibrahim@example.com",
    phone: "+20 1056789012",
    city: "Aswan",
  },
  {
    name: "Mona Adel",
    age: 22,
    email: "mona.adel@example.com",
    phone: "+20 1067890123",
    city: "Port Said",
  },
  {
    name: "Kareem Mostafa",
    age: 33,
    email: "kareem.mostafa@example.com",
    phone: "+20 1078901234",
    city: "Mansoura",
  },
  {
    name: "Yasmin Samir",
    age: 27,
    email: "yasmin.samir@example.com",
    phone: "+20 1089012345",
    city: "Suez",
  },
  {
    name: "Tamer Hussein",
    age: 38,
    email: "tamer.hussein@example.com",
    phone: "+20 1090123456",
    city: "Tanta",
  },
  {
    name: "Dina Amr",
    age: 29,
    email: "dina.amr@example.com",
    phone: "+20 1101234567",
    city: "Ismailia",
  },
];

const Users = () => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      center: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
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
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontWeight: "bold",
        fontSize: "15px",
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
      <DataTable
        noHeader
        defaultSortAsc={false}
        pagination
        highlightOnHover
        columns={columns}
        data={users || []}
        customStyles={customStyles}
        paginationRowsPerPageOptions={[5, 10, 15]}
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
            There are no records to display
          </div>
        }
      />
    </div>
  );
};

export default Users;
