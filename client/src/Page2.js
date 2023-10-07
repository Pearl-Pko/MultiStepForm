import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useFormContext} from "./FormContext";
import arcade from "./public/images/icon-arcade.svg";
import Switch from "./Components/Switch";
import './page2.css'
import ErrorMessage from "./ErrorMessage";

export function Page2(props) {
    const [formData, updateFormData] = useFormContext();
    const [duration, setDuration] = useState(
        formData.duration === "yearly" ? true : false
    );

    const updateDuration = (duration) => {
        setDuration(duration);
        updateFormData({duration: duration ? "yearly" : "monthly"});
    };

    // console.log(props);
    const data = useOutletContext();
    // set monthly as the default duration
    useEffect(() => updateDuration(duration), []);

    return (
        <div className="page2">
            <h2>Select your plan</h2>
            <p> You have the option of monthly or yearl billing</p>

            <fieldset className="plan">
                {data.plans.map((plan) => {
                    return (
                        <>
                            <input
                                checked={formData.plan == plan["name"]}
                                type="radio"
                                id={plan["name"]}
                                name="plan"
                                value={plan["name"]}
                                onChange={(ev) =>
                                    updateFormData({plan: plan["name"]})
                                }
                                required
                            />
                            <label htmlFor={plan["name"]}>
                                <img src={arcade} />
                                <div>
                                    <p>{plan["name"]}</p>
                                    {duration ? (
                                        <p>
                                            $
                                            {
                                                plan["duration"]["yearly"]["price"]
                                            }
                                            /yr
                                        </p>
                                    ) : (
                                        <p>
                                            $
                                            {
                                                plan["duration"]["monthly"]["price"]
                                            }
                                            /mo
                                        </p>
                                    )}
                                    {duration && (
                                        <p>
                                            {
                                                plan["duration"]["yearly"]["discount_months"]
                                            }{" "}
                                            months free
                                        </p>
                                    )}
                                </div>
                            </label>
                        </>
                    );
                })}
                <ErrorMessage message={data.errorMessage["plan"] && "Select one of the above"}/>

            </fieldset>

            <fieldset className="duration">
                <label className="period">Monthly</label>
                <Switch
                    isOn={duration}
                    onColor="#EF476F"
                    handleToggle={() => updateDuration(!duration)}
                />
                <label className="period">Yearly</label>
            </fieldset>
        </div>
    );
}
