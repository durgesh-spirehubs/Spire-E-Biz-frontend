import UpdateCustomerForm from "@/view/customer/updateCustomerForm";
import React from "react";
function page() {
  return <UpdateCustomerForm pageBehaviour="Add" />;
}
page.acl = ["Admin"];

export default page;
