import React, {useEffect, useState} from "react";
import {Link, useOutletContext} from "react-router-dom";
import {useFormContext} from "./FormContext";
import './page4.css'
import {capitalizeFirstLetter, toLowerCaseFirstLetter} from "./utils";

export function Page4() {
    const [formData, updateFormData] = useFormContext();

    const data = useOutletContext();
    // console.log(formData.addOns);

    const planData = data.plans.filter(
        (plan) => plan.name === formData.plan
    )[0];
    const addonData = data.addons.filter((addon) =>
        formData.addOns.includes(addon.name)
    );
    const durationShortName = formData.duration === "yearly" ? "yr" : "mo";
    const durationLongName = formData.duration === "yearly" ? "year" : "month";

    const addonTotal = addonData
        .map((addon) => addon["discount"][formData.duration])
        .reduce((sum, value) => sum + value, 0);
    const total = planData["duration"][formData.duration]["price"] + addonTotal;

    return (
        <div className="page4">
            <h1>Finishing up</h1>
            <p>Double-check everyting looks OK before confirming</p>
            <ul>
                <li key={-1}>
                    <div>
                        <p>{`${planData["name"]} (${capitalizeFirstLetter(
                            formData.duration
                        )})`}</p>
                        <Link to="/2">Change</Link>
                    </div>
                    <p>
                        ${planData["duration"][formData.duration]["price"]}/
                        {durationShortName}
                    </p>
                </li>

                {addonData.map((key, id) => {
                    return (
                        <li key={id}>
                            <p>{key.name}</p>
                            <p>
                                +${key["discount"][formData.duration]}/
                                {durationShortName}
                            </p>
                        </li>
                    );
                })}
            </ul>

            <div>
                <p>Total (per {durationLongName})</p>
                <p>
                    ${total}/{durationShortName}
                </p>
            </div>
        </div>
    );
}
