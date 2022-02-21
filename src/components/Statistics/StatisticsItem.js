import React from "react";

export default function StatisticsItem({ status, getStatistics }) {
  return (
    <p data-test={`statistics-${status}`} className={status}>
      <span>{status}:</span> {getStatistics(status)}
    </p>
  );
}
