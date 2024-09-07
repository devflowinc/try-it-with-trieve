import React from "react";

interface InsertTooltipProps {
  queryLink: string;
}

const InsertTooltip: React.FC<InsertTooltipProps> = ({ queryLink }) => {
  const params = new URLSearchParams(queryLink.split("?")[1]);

  return (
    <div className="trieve-tooltip">
      <h3>Extracted Query Parameters</h3>
      <ul>
        {Array.from(params.entries()).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {decodeURIComponent(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsertTooltip;
