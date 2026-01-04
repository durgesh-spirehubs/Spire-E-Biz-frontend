import UpdateFaqForm from "@/view/settings/faqs/updateFaqForm";
import React from "react";
function page() {
  return <UpdateFaqForm pageBehaviour="Add" />;
}
page.acl = ["Admin"];

export default page;
