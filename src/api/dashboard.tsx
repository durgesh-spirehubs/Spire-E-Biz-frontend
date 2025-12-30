import axiosServices from "@/lib/axios";
export function getTotalAttendance(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/customers${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}