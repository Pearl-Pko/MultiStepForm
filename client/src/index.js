import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import { Page1, Page2, Page3, Page4 } from "./Pages";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import { Page3 } from "./Page3";
import { Page4 } from "./Page4";
import { FormProvider } from "./FormContext";
import ConfirmationPage from "./ConfirmationPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
	<FormProvider>
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<App/>}>
					<Route exact path='1' element={<Page1/>}></Route>
					<Route exact path='2' element={<Page2/>}></Route>
					<Route exact path='3' element={<Page3/>}></Route>
					<Route exact path='4' element={<Page4/>}></Route>
					<Route exact path='confirmation-page' element={<ConfirmationPage/>}></Route>
				</Route>
				<Route path="*" element={<div>Not Found</div>}/>
			</Routes>
		</BrowserRouter>
	</FormProvider>
);

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
