import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
