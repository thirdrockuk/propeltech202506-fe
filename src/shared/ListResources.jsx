import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { resourceApi } from "../api/ResourceApi";

export default function ListResources({ apiEndpoint, columns }) {
  const [resources, setResources] = useState(null);

  const navigate = useNavigate();

  const loadResources = async () => {
    const data = await resourceApi.getResources({
      apiEndpoint: apiEndpoint,
    });
    setResources(data.resources);
  };

  useEffect(() => {
    loadResources();
  }, []);

  if (resources === null) return <></>;

  const handleAddButtonClick = (id) => {
    navigate('/persons/add');
  };

  const handleEditButtonClick = (id) => {
    navigate(`/persons/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id) => {
    await resourceApi.deleteResource({ apiEndpoint: apiEndpoint, id: id });
    loadResources();
  };

  return (
    <>
      <h1>Address book</h1>
      <Button onClick={() => handleAddButtonClick()}>
        Add entry
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell key={column.field}>{column.label}</TableCell>;
            })}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {resources?.map((resource, index) => {
            return (
              <TableRow key={index}>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.field}>
                      {resource[column.field]}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Button onClick={() => handleEditButtonClick(resource.id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteButtonClick(resource.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
