import React from "react";
/**
 * User can choose to use one of the life lines
 * Each life line can only be used once.
 */
export default function HelpButton({ title, helpFunc, isHelpUsed, btnClass }) {
  return (
    <button
      className={`help-btn ${btnClass} ${isHelpUsed && "disabled"}`}
      onClick={helpFunc}
      disabled={isHelpUsed && true}
      data-test="help-button"
    >
      {title}
    </button>
  );
}
