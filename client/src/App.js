import logo from "./logo.svg";
import React, {useEffect, useState, useRef} from "react";
import "./App.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FormContext, useFormContext, FormProvider} from "./FormContext";

function App() {
    const currentPage = parseInt(useLocation().pathname[1]);
    const navigate = useNavigate();
    const [formData, updateFormData] = useFormContext();
    const [addons, setAddons] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        if (!submitted) return;

        const error = {};
        for (const input of formRef.current.elements) {
            if (input.validity.valid) continue;

            if (input.validity.valueMissing)
                error[`${input.name}`] = "This is a required field";
            else if (input.validity.typeMismatch)
                error[`${input.name}`] = `Invalid format for ${input.name}`;
        }
        setErrorMessage(error);
    }, [formData, submitted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(formRef.current);

        // console.log(formRef.current.checkValidity());

        // console.log(formRef.current.elements);

        // formRef.current.elements.forEach(element => {
        //     console.log(element.valid);
        // });

        if (currentPage !== 4) {
            if (formRef.current.checkValidity()) {
                navigate(`/${currentPage + 1}`);
            } else {
                setSubmitted(true);
            }
        } else {
            console.log(formData);
            fetch("/submit", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                navigate("confirmation-page");
            });
        }

        // console.log("submitted");
    };

    useEffect(() => {
        fetch("/plans")
            .then((res) => res.json())
            .then((data) => {
                setPlans(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch("/addons")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAddons(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="page">
            <ul className="links">
                <li>
                    <Link to="/1">1</Link>
                </li>
                <li>
                    <Link to="/2">2</Link>
                </li>
                <li>
                    <Link to="/3">3</Link>
                </li>
                <li>
                    <Link to="/4">4</Link>
                </li>
            </ul>

            <form id="form" onSubmit={handleSubmit} noValidate ref={formRef}>
                <Outlet context={{plans, addons, errorMessage}} />
            </form>

            <div className="buttons">
                {currentPage > 1 && (
                    <button
                        onClick={() => navigate(`/${currentPage - 1}`)}
                        className="left-button"
                    >
                        Go Back
                    </button>
                )}
                {currentPage < 4 && (
                    <button
                        // onClick={() => navigate(`/${currentPage + 1}`)}
                        className="right-button"
                        type="submit"
                        form="form"
                    >
                        Next Step
                    </button>
                )}
                {currentPage === 4 && (
                    <button
                        className="right-button"
                        type="submit"
                        form="form"
                    >
                        Confirm
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
