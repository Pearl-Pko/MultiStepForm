import logo from "./logo.svg";
import React, {useEffect, useState, useRef} from "react";
import "./App.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FormContext, useFormContext, FormProvider} from "./FormContext";

function App() {
    const currentPage = parseInt(useLocation().pathname[1]);
    const navigate = useNavigate();
    const [formData, updateFormData] = useFormContext();
    const [links, setLinks] = useState(["#", "#", "#", "#"]);
    const [addons, setAddons] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const formRef = useRef();

    const [validPages, setValidPages] = useState([false, false, false]);

    const linkClass = (link) => {
        return link === currentPage ? "highlight-link" : "disabled-link";
    };

    const setPageValidity = () => {
        const pages = validPages.slice();
        pages[currentPage - 1] = pageIsValid();
        setValidPages(pages);
    };

    const shouldLink = (link) => {
        // we would allow links to previous pages
        // if the user wants to link to the next page, then the current page has to be valid
        if (link > currentPage) {
            if (link === currentPage + 1 && pageIsValid()) {
                setPageValidity();
                console.log("rerender");
                return `/${link}`;
            }
            return "#";
        }
        return `/${link}`;
    };

    const updateLink = (link) => {
        // const nearestValidLink = links.indexOf("#") - 1;
        // if (link)
        if (pageIsValid()) {
            const page = links[link];
        }
    };

    const pageIsValid = () => formRef.current?.checkValidity();
    const formIsValid = () => !validPages.includes(false);
    // console.log("yes");

    useEffect(() => {
        console.log(validPages);
    });

    useEffect(() => {
        // if (!submitted) return;
        const error = {};
        for (const input of formRef.current.elements) {
            if (input.validity.valid) continue;

            if (input.validity.valueMissing)
                error[`${input.name}`] = "This is a required field";
            else if (input.validity.typeMismatch)
                error[`${input.name}`] = `Invalid format for ${input.name}`;
        }
        setErrorMessage(error);
        setPageValidity();
    }, [formData, submitted]);

    // we go to a new page
    // useEffect(() => {
    //     // if (pageIsValid())
    //     // {
    //     //     setPageValidity();
    //     // }
    //     setPageValidity();
    // }, [currentPage]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        // console.log(formRef.current);

        // console.log(formRef.current.checkValidity());

        // console.log(formRef.current.elements);

        // formRef.current.elements.forEach(element => {
        //     console.log(element.valid);
        // });

        if (currentPage !== 4) {
            // if (pageIsValid()) {
            //     // validPages[currentPage] = true;
            //     setPageValidity();
            //     navigate(`/${currentPage + 1}`);
            // } else {
            //     setSubmitted(true);
            // }
            setPageValidity();
            navigate(`/${currentPage + 1}`);
        } else {
            console.log(formData);
            fetch("/submit", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.ok) navigate("confirmation-page");
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
            {/* <ul className="links">
                <li>
                    <Link to={links[0]} onClick={updateLinks(0)} className={linkClass(1)}>
                        1
                    </Link>
                </li>
                <li>
                    <Link to={links[1]} onClick={updateLinks(1)} className={linkClass(2)}>
                        2
                    </Link>
                </li>
                <li>
                    <Link to={links[3]} onClick={updateLinks(2)} className={linkClass(3)}>
                        3
                    </Link>
                </li>
                <li>
                    <Link to={links[4]} onClick={updateLinks(3)} className={linkClass(4)}>
                        4
                    </Link>
                </li>
            </ul> */}

            <ul className="links">
                <li>
                    <Link to="/1" className={linkClass(1)}>
                        1
                    </Link>
                </li>
                <li>
                    <Link to="/2" className={linkClass(2)}>
                        2
                    </Link>
                </li>
                <li>
                    <Link to="/3" className={linkClass(3)}>
                        3
                    </Link>
                </li>
                <li>
                    <Link to="/4" className={linkClass(4)}>
                        4
                    </Link>
                </li>
            </ul>

            <form id="form" onSubmit={handleSubmit} noValidate ref={formRef}>
                <Outlet context={{plans, addons, errorMessage, formIsValid}} />
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
                        disabled={!pageIsValid()}
                    >
                        Next Step
                    </button>
                )}
                {currentPage === 4 && (
                    <button
                        className="right-button"
                        type="submit"
                        form="form"
                        disabled={!formIsValid()}
                    >
                        Confirm
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
