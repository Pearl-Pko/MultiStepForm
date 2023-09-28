import logo from "./logo.svg";
import React, {useState} from "react";
import "./App.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FormContext, FormProvider} from "./FormContext";

function App() {
    const currentPage = parseInt(useLocation().pathname[1]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    return (
        <div>
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

            <div>
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
            </div>
        </div>
    );
}

export default App;
