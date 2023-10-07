import React, {useEffect} from "react";
import {useState} from "react";
import {useFormContext} from "./FormContext";
import arcade from "./public/images/icon-arcade.svg";
import advanced from "./public/images/icon-advanced.svg";
import pro from "./public/images/icon-pro.svg";
// import advanced from './icon-advanced.svg'
import "./page1.css";
import "./page2.css";
import "./page3.css";
import "./page4.css";
import Switch from "./Components/Switch";
import Checkbox from "./Components/Checkbox";
import {Link, useOutletContext} from "react-router-dom";
import {capitalizeFirstLetter, toLowerCaseFirstLetter} from "./utils";

