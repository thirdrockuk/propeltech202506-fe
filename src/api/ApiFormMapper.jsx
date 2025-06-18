import { getIn, setIn } from "formik";

export const toFormValues = (resource, fields) => {
  let formValues = {};

  fields.forEach((field) => {
    const fieldValue = getIn(resource, field.name);
    let isFieldMapped = false;

    // This function could be extended to handle many field types: checkbox, date, select, etc

    // Default mapping
    if (!isFieldMapped) {
      formValues = setIn(formValues, field.name, fieldValue || "");
    }
  });

  return formValues;
};

export const toApiValues = (formValues, fields) => {
  let apiValues = {};

  fields.forEach((field) => {
    const formValue = getIn(formValues, field.name);
    let isFieldMapped = false;

    // This function could be extended to handle many field types: checkbox, date, select, etc

    // Default mapping
    if (!isFieldMapped) {
      apiValues = setIn(apiValues, field.name, formValue);
    }
  });

  return apiValues;
};
