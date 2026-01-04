import axiosServices from "@/lib/axios";

export function getTransactionsList(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/transactions${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getTransactionById(id?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/transactions/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
