import DataTable from "react-data-table-component";

const playgroundsOwners = [
  {
    name: "Mohamed Fathy",
    playground: "Elite Sports Club",
    email: "mohamed.fathy@example.com",
    phone: "+20 1145678901",
    city: "Cairo",
  },
  {
    name: "Amina Khaled",
    playground: "Greenfield Arena",
    email: "amina.khaled@example.com",
    phone: "+20 1156789012",
    city: "Alexandria",
  },
  {
    name: "Youssef Gamal",
    playground: "Sunset Park",
    email: "youssef.gamal@example.com",
    phone: "+20 1167890123",
    city: "Giza",
  },
];

const PlaygroundsOwners = () => {
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true, center: true },
    {
      name: "Playground",
      selector: (row) => row.playground,
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
    { name: "City", selector: (row) => row.city, sortable: true, center: true },
  ];

  return (
    <div className="container">
      <DataTable
        noHeader
        defaultSortAsc={false}
        pagination
        highlightOnHover
        columns={columns}
        data={playgroundsOwners || []}
        paginationRowsPerPageOptions={[5, 10, 15]}
        noDataComponent={
          <div className="no-data">No playground owners found</div>
        }
      />
    </div>
  );
};

export default PlaygroundsOwners;
