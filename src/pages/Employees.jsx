import DataTable from "react-data-table-component";

const employees = [
  {
    name: "Ali Ahmed",
    position: "Manager",
    email: "ali.ahmed@example.com",
    phone: "+20 1112345678",
    department: "HR",
  },
  {
    name: "Fatma Said",
    position: "Developer",
    email: "fatma.said@example.com",
    phone: "+20 1123456789",
    department: "IT",
  },
  {
    name: "Hassan Mahmoud",
    position: "Designer",
    email: "hassan.mahmoud@example.com",
    phone: "+20 1134567890",
    department: "Marketing",
  },
];

const Employees = () => {
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true, center: true },
    {
      name: "Position",
      selector: (row) => row.position,
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
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      center: true,
    },
  ];

  return (
    <div className="container">
      <DataTable
        noHeader
        defaultSortAsc={false}
        pagination
        highlightOnHover
        columns={columns}
        data={employees || []}
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 10, 15]}
        noDataComponent={<div className="no-data">No employees found</div>}
      />
    </div>
  );
};

export default Employees;
