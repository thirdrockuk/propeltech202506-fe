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
import { toFormValues, toApiValues } from "../api/ApiFormMapper";
import AddEditResourceForm from "./AddEditResourceForm";

export default function AddEditResource({
  apiEndpoint,
  fields,
  id,
  validationSchema,
}) {
  const [resource, setResource] = useState(null);
  const [apiErrors, setApiErrors] = useState([]);

  const navigate = useNavigate();

  const loadResource = async () => {
    let resource = {};
    if (id) {
      resource = await resourceApi.getResource({ apiEndpoint, id });
    }
    setResource(resource);
  };

  useEffect(() => {
    loadResource();
  }, []);

  if (!resource) return <></>;

  const onFormSubmit = async (formValues) => {
    const apiValues = toApiValues(formValues, fields);
    const response = await resourceApi.saveResource({
      apiEndpoint,
      data: apiValues,
      id,
    });
    if (!response.resource && response.violations) {
      setApiErrors(response.violations);
    }
    if (response.resource) {
      navigate(`/${apiEndpoint}`);
    }
  };

  const getApiError = (field) => {
    if (apiErrors) {
      const apiError = apiErrors.find(
        (apiError) => apiError.propertyPath === field
      );
      return apiError?.message;
    }
    return false;
  };

  const handleCancelButtonClick = (id) => {
    navigate(`/persons`);
  };

  return (
    <AddEditResourceForm
      cancelLocation={`/${apiEndpoint}`}
      fields={fields}
      formValues={toFormValues(resource, fields)}
      getApiError={getApiError}
      onFormSubmit={onFormSubmit}
      validationSchema={validationSchema}
    />
  );
}
