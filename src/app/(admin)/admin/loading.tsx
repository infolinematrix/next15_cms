"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed top-0 h-screen w-full bg-black bg-opacity-10 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div>
        <Loader2 className="h-10 w-10 mt-10 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
