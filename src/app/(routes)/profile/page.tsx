import MainCard from "@/components/dashboard/main-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const Profile = () => {
  return (
    <MainCard
      title="Profile"
      description="View Profile Details"
      action={<Button>Edit Profile</Button>}
    >
      <div className="flex gap-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo
        earum nulla autem architecto provident, tenetur eius tempora nobis
        eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
        magnam?
      </div>
    </MainCard>
  );
};

export default Profile;
