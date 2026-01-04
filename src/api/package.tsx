import axiosServices from "@/lib/axios";

// ================= || USER API || ====================== //

export function getPackagesList() {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/packages`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}