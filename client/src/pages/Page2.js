import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useFormContext} from "../FormContext";
// import arcade from "../public/images/icon-arcade.svg";
import Switch from "../Components/Switch";
import './Page2.css'

export function Page2() {
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
            <h2 className="main-text-color">Select your plan</h2>
            <p className="sub-text-color"> You have the option of monthly or yearly billing</p>

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
                                <img src={plan["image uri"] }/>
                                <div>
                                    <p className="main-text-color">{plan["name"]}</p>
                                    {duration ? (
                                        <p className="sub-text-color">
                                            $
                                            {
                                                plan["duration"]["yearly"]["price"]
                                            }
                                            /yr
                                        </p>
                                    ) : (
                                        <p className="sub-text-color">
                                            $
                                            {
                                                plan["duration"]["monthly"]["price"]
                                            }
                                            /mo
                                        </p>
                                    )}
                                    {duration && (
                                        <p style={{fontWeight: "500", fontSize: "0.9em"}} className="main-text-color">
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
            </fieldset>
            {data.errorMessage["plan"] && <p className="error2">Select one of the above</p>}

            <fieldset className="duration">
                <label className={`period ${formData.duration === "monthly" ? "main-text-color" : "sub-text-color"}`}>Monthly</label>
                <Switch
                    isOn={duration}
                    baseColor="#002758"
                    onColor="#002758"
                    // cssColor={"var(--main-text-color)"}
                    handleToggle={() => updateDuration(!duration)}
                />
                <label className={`period ${formData.duration === "yearly" ? "main-text-color" : "sub-text-color"}`}>Yearly</label>
            </fieldset>
        </div>
    );
}
