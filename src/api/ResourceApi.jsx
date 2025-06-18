import axios from "axios";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/ld+json; charset=utf-8",
  };
  return headers;
};

class ResourceApi {
  async getResources({ apiEndpoint }) {
    return new Promise((resolve, reject) => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${process.env.REACT_APP_API_BASE_URL}/${apiEndpoint}`,
          headers: getHeaders(),
        };

        axios(axiosConfig)
          .then((response) => {
            const resources = response.data["member"];
            const resourceCount = response.data["totalItems"];
            resolve({ resources, resourceCount });
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message || "There was a problem";
            reject(new Error(errorMessage));
          });
      } catch (err) {
        console.error("[Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getResource({ apiEndpoint, id }) {
    return new Promise((resolve, reject) => {
      try {
        const axiosConfig = {
          method: "GET",
          url: `${process.env.REACT_APP_API_BASE_URL}/${apiEndpoint}/${id}`,
          headers: getHeaders(),
        };

        axios(axiosConfig)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message || "There was a problem";
            reject(new Error(errorMessage));
          });
      } catch (err) {
        console.error("[Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async saveResource(props) {
    const { apiEndpoint, data, id, extension } = props;

    return new Promise((resolve, reject) => {
      try {
        const axiosConfig = {
          method: id ? "PUT" : "POST",
          url: `${process.env.REACT_APP_API_BASE_URL}/${apiEndpoint}${
            id ? `/${id}` : ""
          }`,
          headers: getHeaders(),
          data: JSON.stringify(data),
        };

        axios(axiosConfig)
          .then((response) => {
            resolve({ resource: response.data });
          })
          .catch((error) => {
            if (error.response?.status === 422) {
              resolve({
                resource: null,
                violations: error.response.data?.violations || [],
              });
            }
            const errorMessage =
              error.response?.data?.message || "There was a problem";
            reject(new Error(errorMessage));
          });
      } catch (err) {
        console.error("[Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async deleteResource(props) {
    const { apiEndpoint, id } = props;

    return new Promise((resolve, reject) => {
      try {
        const axiosConfig = {
          method: "DELETE",
          url: `${process.env.REACT_APP_API_BASE_URL}/${apiEndpoint}/${id}`,
          headers: getHeaders(),
        };

        axios(axiosConfig)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message || "There was a problem";
            reject(new Error(errorMessage));
          });
      } catch (err) {
        console.error("[Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
}

export const resourceApi = new ResourceApi();
