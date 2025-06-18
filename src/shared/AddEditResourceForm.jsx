import { useNavigate } from "react-router-dom";
import { getIn, Formik } from "formik";
import { Box, Button, Grid, TextField } from "@mui/material";

export default function AddEditResourceForm(props) {
  const {
    cancelLocation,
    fields,
    formValues,
    getApiError,
    onFormSubmit,
    validationSchema,
  } = props;

  const navigate = useNavigate();

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={onFormSubmit}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <form
            onSubmit={(event) => {
              formik.validateForm().then((errors) => {
                // Render an 'error' message
              });
              formik.handleSubmit(event);
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {fields.map((field) => (
                <Grid container>
                  <Grid size={3}></Grid>
                  <Grid size={3}>{field.label}</Grid>
                  <Grid size={3}>
                    <TextField
                      error={Boolean(getApiError(field.name) || (getIn(formik.touched, field.name) && getIn(formik.errors, field.name)))}
                      helperText={getApiError(field.name) || (getIn(formik.touched, field.name) && getIn(formik.errors, field.name))}
                      fullWidth
                      key={field.name}
                      name={field.name}
                      onChange={formik.handleChange}
                      value={getIn(formik.values, field.name)}
                    />
                  </Grid>
                  <Grid size={3}></Grid>
                </Grid>
              ))}

              <Grid container>
                <Grid size={3}></Grid>
                <Grid size={6}>
                  <Button
                    onClick={async () => {
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </Button>
                  <Button onClick={() => navigate(cancelLocation)}>Cancel</Button>
                </Grid>
                <Grid size={3}></Grid>
              </Grid>
            </Box>

          </form>
        );
      }}
    </Formik>
  );
}
