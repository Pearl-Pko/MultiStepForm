import React from "react";
import "./Switch.css";

const Switch = ({isOn, handleToggle, baseColor="#808080", onColor, cssColor}) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label 
                style={{background: (!isOn && baseColor) || (isOn && onColor)}}
                className="react-switch-label" 
                htmlFor={`react-switch-new`}>
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;
