"use client";
import DashboardLayout from "@/components/admin/dashboard_layout";
import React, { useState } from "react";
import CreateNodeForm from "../_components/CreateNodeForm";

const CreateNodePage = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between">
        <div className="text-lg font-bold mb-2">Create Node</div>
      </div>
      <section className="title-section">
        <div className="title-section-name">Information</div>

        <div className="container mb-5">
          <div className="text-muted-foreground">
            <CreateNodeForm />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default CreateNodePage;
