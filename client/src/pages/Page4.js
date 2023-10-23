import React, {useEffect, useState} from "react";
import {Link, useOutletContext} from "react-router-dom";
import {useFormContext} from "../FormContext";
import "./Page4.css";
import {capitalizeFirstLetter, toLowerCaseFirstLetter} from "../utils";
import ErrorMessage from "../ErrorMessage";

export function Page4() {
    const [formData, updateFormData] = useFormContext();

    const data = useOutletContext();

    if (!data.formIsValid()) {

        return (
        <div className="page4">
            <h2 className="main-text-color">Finishing up</h2>
            <ErrorMessage message="For you to continue with the rest of this page, the other pages have to be correctly filled"/>
            {/* <p className="error">error</p> */}
        </div>);  
    } 

    const planData = data.plans.filter(
        (plan) => plan.name === formData.plan
    )[0];
    const addonData = data.addons.filter((addon) =>
        formData.addOns?.includes(addon.name)
    );
    const durationShortName = formData.duration === "yearly" ? "yr" : "mo";
    const durationLongName = formData.duration === "yearly" ? "year" : "month";

    console.log(addonData);
    const addonTotal = addonData
        ?.map((addon) => addon["discount"][formData.duration])
        ?.reduce((sum, value) => sum + value, 0);
    let total = planData.duration[formData.duration].price + addonTotal;
    // if (!formData.duration) total = "---";

    return (
        <div className="page4">
            <h2 className="main-text-color">Finishing up</h2>
            <p className="sub-text-color">
                Double-check everyting looks OK before confirming
            </p>

            <ul>
                <li key={-1}>
                    <div>
                        <p className="main-text-color">{`${
                            planData["name"]
                        } (${capitalizeFirstLetter(formData.duration)})`}</p>
                        <Link to="/2" className="sub-text-color">
                            Change
                        </Link>
                    </div>
                    <p className="main-text-color">
                        ${planData["duration"][formData.duration]["price"]}/
                        {durationShortName}
                    </p>
                </li>

                {addonData.map((key, id) => {
                    return (
                        <li key={id}>
                            <p className="sub-text-color">{key.name}</p>
                            <p className="main-text-color">
                                +${key["discount"][formData.duration]}/
                                {durationShortName}
                            </p>
                        </li>
                    );
                })}
            </ul>

            <div>
                <p className="sub-text-color">Total (per {durationLongName})</p>
                <p className="confirmation-color">
                    +${total}/{durationShortName}
                </p>
            </div>
        </div>
    );
}
