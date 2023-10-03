import logo from "./logo.svg";
import React, {useEffect, useState} from "react";
import "./App.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FormContext, useFormContext, FormProvider} from "./FormContext";

function App() {
    const currentPage = parseInt(useLocation().pathname[1]);
    const navigate = useNavigate();
    const [formData, updateFormData] = useFormContext();


    // useEffect(() => {
    //     fetch("/api")
    //         .then((res) => {console.log(res); return res.text()})
    //         .then((data) => {
    //             console.log("yeah");
    //             console.log(data)})
    //         .catch(err => console.log(err));
    // });

    const handleSubmit = () => {
        console.log(formData);
        fetch('/submit', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log("submitted");
    };

    return (
        <div className="page">
            <ul>
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

            <form>
                <Outlet />
            </form>

            {/* <div> */}
                {currentPage > 1 && (
                    <button onClick={() => navigate(`/${currentPage - 1}`)}>
                        Go Back
                    </button>
                )}
                {currentPage < 3 && (
                    <button onClick={() => navigate(`/${currentPage + 1}`)}>
                        Next Step
                    </button>
                )}
                {(currentPage === 3) &&  (
                    <button onClick={() => handleSubmit()}>
                        Confirm
                    </button>
                )}
            {/* </div> */}
        </div>
    );
}

export default App;
