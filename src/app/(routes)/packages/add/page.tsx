import UpdatePackageForm from "@/view/package&offer/updatePackageForm";
import React from "react";
function page() {
  return <UpdatePackageForm pageBehaviour="Add" />;
}
page.acl = ["Admin"];

export default page;
