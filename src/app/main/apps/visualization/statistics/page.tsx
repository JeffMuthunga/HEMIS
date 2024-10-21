import React from "react";
import TableauEmbed from "../../../../shared-components/tableau/TableauEmbed";

const VisualizationPage = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1>Visual Analytics</h1>
      <TableauEmbed />
    </div>
  );
};

export default VisualizationPage;
