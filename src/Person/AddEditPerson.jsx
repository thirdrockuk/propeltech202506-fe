import { useParams } from "react-router-dom";
import * as Yup from "yup";

import AddEditResource from "../shared/AddEditResource";

const apiEndpoint = "persons";

const fields = [
  {
    name: "first_name",
    label: "First name",
  },
  {
    name: "last_name",
    label: "Last name",
  },
  {
    name: "phone",
    label: "Phone",
  },
  {
    name: "email",
    label: "Email",
  },
];

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().required("Email is required"),
});

export default function AddEditPerson() {
  const params = useParams();
  const id = params.id ? params.id : null;

  return (
    <AddEditResource
      apiEndpoint={apiEndpoint}
      fields={fields}
      id={id}
      validationSchema={validationSchema}
    />
  );
}
