"use client";

import { useToggleSidebar } from "@/utils/states";
import DashboardSidebar from "./dashboard_sidebar";
import { HeaderNav } from "./header";
import { Suspense } from "react";
// import Loading from "@/app/(admin)/___loading";
// import Loading from "@/app/loading";
// import { Suspense } from "react";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const DashboardLayout = ({ children }: any) => {
  const sidebarState = useToggleSidebar((state) => state.isOpen);

  return (
    <>
      <DashboardSidebar />

      <div
        className={`1sm:p-4 1pt-4 ${
          sidebarState ? "ml-[80px]" : "ml-[250px]"
        } min-w-[250px] w-screen h-screen overflow-hidden overflow-y-scroll`}
      >
        <HeaderNav />

        <div className="p-2">
          <div className="flex  gap-4">
            <ProgressBar
              height="4px"
              color="#000000"
              options={{ showSpinner: true }}
              shallowRouting
            />
            <div className="flex xl:w-2/3 flex-col p-4 w-full">{children}</div>
            <div className=" xl:w-1/3 hidden xl:block  flex-col border-l h-screen border-border translate-x-0 bg-backgroun w-full p-2">
              Help
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
