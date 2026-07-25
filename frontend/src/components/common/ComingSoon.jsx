import React from "react";
import Layout from "./Layout";

const ComingSoon = ({ title }) => (
  <Layout>
    <div className="container" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <span className="eyebrow" style={{ marginBottom: 12 }}>Under construction</span>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>{title}</h1>
      <p className="text-muted">This page is being built in the next stage of the project.</p>
    </div>
  </Layout>
);


export default ComingSoon;
