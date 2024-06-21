import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kanban Board",
};

 const RootLayouth = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-600`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

export default RootLayouth;