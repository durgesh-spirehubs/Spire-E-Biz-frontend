import axiosServices from "@/lib/axios";

export function getContactUsList(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/contact-us${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteContactUs(values: number) {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/contact-us/${values}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getContactUsById(id?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/contact-us/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
