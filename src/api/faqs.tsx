import axiosServices from "@/lib/axios";

export function getFaqsList(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/faqs${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteFaq(values: number) {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/faqs/${values}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
