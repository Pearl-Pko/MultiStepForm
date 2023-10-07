import React from "react";
import {useFormContext} from "./FormContext";
import "./page1.css";
import ErrorMessage from "./ErrorMessage";
import {useOutletContext} from "react-router-dom";

export function Page1() {
    const [formData, updateFormData] = useFormContext();
    const data = useOutletContext();

    console.log(data.errorMessage);
    return (
        <div className="page1">
            <h2>Personal info</h2>
            <p>Please provide your name, email address, and phone number</p>

            <div>
                <label for="name">
                    Name <span style={{color: "red"}}>*</span>
                </label>
                <ErrorMessage message={data.errorMessage["name"]} />
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={data.errorMessage["name"] && "error"}
                    value={formData.name || ""}
                    onChange={(ev) => updateFormData({name: ev.target.value})}
                    placeholder="e.g. Stephen King"
                    required
                />
            </div>

            <div>
                <label for="email">
                    Email Address <span style={{color: "red"}}>*</span>
                </label>
                <ErrorMessage message={data.errorMessage["email"]} />
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={data.errorMessage["email"] && "error"}
                    value={formData.email || ""}
                    onChange={(ev) => updateFormData({email: ev.target.value})}
                    placeholder="e.g. stephenking@lorem.com"
                    required
                />
            </div>

            <div>
                <label for="phone_number">
                    Phone Number <span style={{color: "red"}}>*</span>
                </label>
                <ErrorMessage message={data.errorMessage["phone number"]} />
                <input
                    type="tel"
                    id="phone_number"
                    name="phone number"
                    className={data.errorMessage["phone number"] && "error"}
                    value={formData["phone number"] || ""}
                    onChange={(ev) =>
                        updateFormData({"phone number": ev.target.value})
                    }
                    placeholder="e.g. +1 234 567 890"
                    required
                />
                {/* <span className="error">gf</span> */}
            </div>
        </div>
    );
}
