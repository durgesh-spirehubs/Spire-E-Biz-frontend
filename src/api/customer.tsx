import axiosServices from "@/lib/axios";

// ================= || USER API || ====================== //

export function getCustomersList(query?: string) {
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

export function deleteCustomer(values: number) {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/customers/${values}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// export function userResetPassword(values) {
//     return new Promise((resolve, reject) => {
//         axios
//             .put('/reset-password', values)
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// }

// export function sendUserOTP(values) {
//     return new Promise((resolve, reject) => {
//         axios
//             .put('/resend-verify-token', values)
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// }

// export function verifyEmailOTP(values) {
//     return new Promise((resolve, reject) => {
//         axios
//             .put('/verify', values)
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// }
