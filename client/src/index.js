import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Page1, Page2, Page3, Page4 } from "./Pages";
import { FormProvider } from "./FormContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
	<FormProvider>
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<App/>}>
					<Route path='1' element={<Page1/>}></Route>
					<Route path='2' element={<Page2/>}></Route>
					<Route path='3' element={<Page3/>}></Route>
					<Route path='4' element={<Page4/>}></Route>
				</Route>
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
