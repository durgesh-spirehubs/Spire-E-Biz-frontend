import UpdateCustomerForm from "@/view/customer/updateCustomerForm";
import React from "react";

function UpdateDoctor() {
  return <UpdateCustomerForm pageBehaviour="Edit" />;
}
UpdateDoctor.acl = ["Admin", "Organization"];

export default UpdateDoctor;
