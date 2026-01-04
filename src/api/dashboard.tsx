import axiosServices from "@/lib/axios";
export function getTotalAttendance(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/dashboard/attendances${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function getPendingSalesOrder(query?: string) {
  return new Promise((resolve, reject) => {
    axiosServices
    .get(`/api/dashboard/pendingSalesOrder${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}