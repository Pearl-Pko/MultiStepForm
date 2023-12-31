import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useFormContext} from "../FormContext";
import {capitalizeFirstLetter, toLowerCaseFirstLetter} from "../utils";
import Checkbox from "../Components/Checkbox";
import "./Page3.css";

export function Page3() {
    const [formData, updateFormData] = useFormContext();

    const updateChecked = (ev) => {
        if (ev.target.checked)
            updateFormData({addOns: [...formData.addOns, ev.target.value]});
        else {
            const data = formData.addOns.filter(
                (item) => item !== ev.target.value
            );
            updateFormData({addOns: data});
        }
    };

    const ticked = (value) => formData.addOns?.indexOf(value) !== -1;

    useEffect(() => {
        if (!formData.addOns) updateFormData({addOns: []});
    }, []);

    const data = useOutletContext();

    return (
        <div className="page3">
            <h2 className="main-text-color">Pick add-ons</h2>
            <p className="sub-text-color">Add-ons help enhance your gaming experience</p>

            <fieldset className="addons">
                {data.addons.map((addon, index) => {
                    const id = addon["name"].replace(" ", "_");
                    return (
                        <label htmlFor={id} key={index}>
                            <div>
                                <Checkbox
                                    id={id}
                                    checked={ticked(addon["name"])}
                                    onChange={(ev) => updateChecked(ev)}
                                    value={addon["name"]}
                                    name="addons"
                                />
                                <div>
                                    <p className="main-text-color">{addon["name"]}</p>
                                    <p className="sub-text-color">{addon["description"]}</p>
                                </div>
                            </div>
                            {formData.duration === "yearly" ? (
                                <p className="confirmation-color">+${addon["discount"]["yearly"]}/yr</p>
                            ) : (
                                <p className="confirmation-color">+${addon["discount"]["monthly"]}/mo</p>
                            )}
                        </label>
                    );
                })}
            </fieldset>
        </div>
    );
}
