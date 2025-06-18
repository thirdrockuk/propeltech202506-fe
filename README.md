# An utterly unstyled FE for the PropelTech technical assessment
Although this is bare bones, there is some abstraction in here:
- Abstracted `ListResources` and `AddEditResource` for reuse. `ListPersons` and `AddEditPerson` lean on this abstraction.
- Component `ResourceApi` performs the API requests and parse responses, using Axios.
- Component `ApiFormMapper` performs a standard mapping between the resource (ie API values) and form fields (ie form values).
- Uses Formik for input fields, along with Yup for client-side input validation.
- Renders client-side and server-side validation errors

There are lots of room for improvement:
- The layout, sure :)
- This POC only implements textbox inputs, which could be expanded to support checkboxes, selects, date pickers, etc.
- Better user feedback and a confirmation modal before deletion.
- This should really have been done in TypeScript.
- And linting and testing... they're not here, at all.

Unfortunately, I have not had the time deploy this FE due to the time required to set up a signed SSL certificate for the FE/BE interaction, but I can show it working locally.