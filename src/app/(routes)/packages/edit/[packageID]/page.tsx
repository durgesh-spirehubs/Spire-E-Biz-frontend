import UpdatePackageForm from "@/view/package&offer/updatePackageForm";
import React from "react";

function UpdateDoctor() {
  return <UpdatePackageForm pageBehaviour="Edit" />;
}
UpdateDoctor.acl = ["Admin", "Organization"];

export default UpdateDoctor;
