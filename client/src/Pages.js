import React, {useEffect} from "react";
import {useState} from "react";
import {useFormContext} from "./FormContext";

export function Page1() {
    const [formData, updateFormData] = useFormContext();

    return (
        <>
            <h2>Personal info</h2>
            <p>Please provide your name, email address, and phone number</p>

            <div>
                <label for="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={(ev) => updateFormData({name: ev.target.value})}
                    placeholder="e.g. Stephen King"
                />
            </div>

            <div>
                <label for="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={(ev) => updateFormData({email: ev.target.value})}
                    placeholder="e.g. stephenking@lorem.com"
                />
            </div>

            <div>
                <label for="phone_number">Phone Number</label>
                <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number || ""}
                    onChange={(ev) =>
                        updateFormData({phone_number: ev.target.value})
                    }
                    placeholder="e.g. +1 234 567 890"
                />
            </div>
        </>
    );
}

export function Page2() {
    const [duration, setDuration] = useState("Yearly");
    const [formData, updateFormData] = useFormContext();

    const updateDuration = (duration) => {
        setDuration(duration);
        updateFormData({duration});
    };

    return (
        <>
            <h1>Select your plan</h1>
            <p> You have the option of monthly or yearl billing</p>

            <fieldset>
                <label for="arcade">
                    <div>
                        <img />
                        <div>
                            <h2>Arcade</h2>
                            <p>$9/mo</p>
                            {duration == "yearly" && <p>2 months free</p>}
                        </div>
                    </div>
                </label>
                <input
                    checked={formData.plan == "arcade"}
                    type="radio"
                    id="arcade"
                    name="plan"
                    value="arcade"
                    onChange={(ev) => updateFormData({plan: "arcade"})}
                />

                <label for="advanced">
                    <div>
                        <img />
                        <div>
                            <h2>Advanced</h2>
                            <p>$12/mo</p>
                            {duration == "yearly" && <p>2 months free</p>}
                        </div>
                    </div>
                </label>
                <input
                    checked={formData.plan == "advanced"}
                    type="radio"
                    id="advanced"
                    name="plan"
                    value="advanced"
                    onChange={(ev) => updateFormData({plan: "advanced"})}
                />

                <label for="pro">
                    <div>
                        <img />
                        <div>
                            <h2>Pro</h2>
                            <p>$15/mo</p>
                            {duration == "yearly" && <p>2 months free</p>}
                        </div>
                    </div>
                </label>
                <input
                    checked={formData.plan == "pro"}
                    type="radio"
                    id="pro"
                    name="plan"
                    onChange={(ev) => updateFormData({plan: "pro"})}
                    value="pro"
                />
            </fieldset>

            <fieldset>
                <label for="monthly">Monthly</label>
                <input
                    checked={formData.duration == "monthly"}
                    type="radio"
                    id="monthly"
                    name="duration"
                    value="monthly"
                    onChange={() => updateDuration("monthly")}
                />

                <label for="yearly">Yearly</label>
                <input
                    checked={formData.duration == "yearly"}
                    type="radio"
                    id="yearly"
                    name="duration"
                    value="yearly"
                    onChange={() => updateDuration("yearly")}
                />
            </fieldset>
        </>
    );
}

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
        if (!formData.addOns) updateFormData({addOns: []})
    }, []);

    return (
        <>
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience</p>

            <div>
                <input
                    type="checkbox"
                    checked={ticked("online_service")}
                    onChange={(ev) => updateChecked(ev)}
                    value="online_service"
                    name="add_ons"
                ></input>
                <label for="online_service">
                    <div>
                        <h2>Online Service</h2>
                        <p>Access to multiplayer games</p>
                    </div>
                    <p>+$10/yr</p>
                </label>
            </div>

            <div>
                <input
                    onChange={(ev) => updateChecked(ev)}
                    checked={ticked("larger_storage")}
                    type="checkbox"
                    value="larger_storage"
                    name="add_ons"
                ></input>
                <label for="larger_storage">
                    <div>
                        <h2>Larger storage</h2>
                        <p>Extra 1TB of cloud save</p>
                    </div>
                    <p>+$20/yr</p>
                </label>
            </div>
            <div>
                <input
                    type="checkbox"
                    onChange={(ev) => updateChecked(ev)}
                    checked={ticked("customizable_profile")}
                    value="customizable_profile"
                    name="add_ons"
                ></input>
                <label for="customizable_profile">
                    <div>
                        <h2>Customizable profile</h2>
                        <p>Custom theme on your profile</p>
                    </div>
                    <p>+$20/yr</p>
                </label>
            </div>
        </>
    );
}

export function Page4() {
    return <div></div>;
}
