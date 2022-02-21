import React, { useState, useEffect, useRef } from "react";

export default function CircleProgressBar({
  size,
  value,
  totalValue,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
}) {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const calculatePercentage = (v, t) => {
    return (v / t) * 100;
  };
  const progress = calculatePercentage(value, totalValue);

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = "transition: stroke-dashoffset 1050ms linear;";
  }, [setOffset, circumference, value, offset]);

  return (
    <>
      <svg
        className="svg"
        width={size}
        height={size}
        transform={`rotate(-90 ${center} ${center})`}
      >
        <circle
          className="svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="svg-circle"
          stroke={progress < 20 ? "#d1061e" : circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          ref={circleRef}
        ></circle>
        <text
          className="svg-circle-text"
          x={center}
          y={center + 10}
          transform={`rotate(90 ${center} ${center})`}
        >
          {Math.round(value / 1000)}
        </text>
      </svg>
    </>
  );
}
