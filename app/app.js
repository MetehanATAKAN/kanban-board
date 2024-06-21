"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ToastifyContainer from "../components/Toast/ToastContainer";
import { addVisitedPage } from "../lib/localStorage/localStorage";
import VisitedPages from "../components/VisitedPages/VisitedPages";

const ClientWrapper = ({ children }) => {
  const pathName = usePathname();

  useEffect(() => {
    const handleRouteChange = (url) => {
      addVisitedPage(url);
    };
    handleRouteChange(pathName);
  }, [pathName]);

  return (
    <>
      {children}
      <VisitedPages />
      <ToastifyContainer />
    </>
  );
};

export default ClientWrapper;
