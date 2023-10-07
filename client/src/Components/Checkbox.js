import React, {useState} from "react";
// import "./Checkbox.css";
import './Checkbox2.css'


const Checkbox = ({id, checked, handleToggle, ...props}) => {
    // const defaultChecked = checked ? checked : false;
    // const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <input
                type="checkbox"
                // onChange={() => setIsChecked(!isChecked)}
                onChange={handleToggle}
                checked={checked}
                id={id}
                className="checkbox-input"
                {...props}
            />
            <label htmlFor={id} className="checkbox-wrapper">
                <span className="checkmark"></span>
            </label>
        </>
    );
};
export default Checkbox;
