import UpdateBussinessTypeForm from "@/view/settings/businessType/updateBussinessTypeForm";
import React from "react";
function page() {
  return <UpdateBussinessTypeForm pageBehaviour="Add" />;
}
page.acl = ["Admin"];

export default page;
