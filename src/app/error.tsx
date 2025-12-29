"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const error = () => {
  return (
    <div className="justify-center items-center">
      We are fetching some server error
      <Button>Retry</Button>
    </div>
  );
};

export default error;
