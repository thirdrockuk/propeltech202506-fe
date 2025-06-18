import ListResources from "../shared/ListResources";

const apiEndpoint = "persons";

const columns = [
  {
    field: "first_name",
    label: "First name",
  },
  {
    field: "last_name",
    label: "Last name",
  },
  {
    field: "phone",
    label: "Phone",
  },
  {
    field: "email",
    label: "Email",
  },
];

export default function ListPersons() {
  return (
    <ListResources
      apiEndpoint={apiEndpoint}
      columns={columns}
      />
  );
}
