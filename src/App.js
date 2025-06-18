import { Routes, Route } from "react-router-dom";
import AddEditPerson from "./Person/AddEditPerson";
import ListPersons from "./Person/ListPersons";
import "./styles.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/persons" element={<ListPersons />} />
        <Route path="/persons/add" element={<AddEditPerson />} />
        <Route path="/persons/edit/:id" element={<AddEditPerson />} />
        <Route path="/persons/add" element={<AddEditPerson />} />
      </Routes>
    </>
  );
}
