import axiosServices from "@/lib/axios";

export function getBusinessTypeList(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/business-type${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteBusinessType(values: number) {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/business-type/${values}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
