import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";

import Test from "./component/Test/Test"
import FileUploadPage from "./component/Test/FileUploadPage";
import Validation from "./component/Test/Validation";
import SimpleForm from "./component/Formik/SimpleForm";
import RegisterForm from "./component/Practice/RegisterForm";
import ValidateForm from "./component/Practice/ValidateForm";
import ValidateFormLogin from "./component/Practice/ValidateFormLogin";
import ValidateFormLoginFormik from "./component/Practice/ValidateFormLoginFormik";
import ContactForm from "./component/Exercise/ContactForm";
import BookManager from "./component/Exercise/BookManager";


function App() {

    return (
        <div>
            <nav>
                <ul>
                    <h1>Course 7:</h1>
                    <h2>Practice</h2>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/test"}>Test</Link>
                    </li>
                    <li>
                        <Link to={"/fileupload"}>File Upload</Link>
                    </li>
                    <li>
                        <Link to={"/validation"}>Validation</Link>
                    </li>
                    <h2>Formik Series</h2>
                    <li>
                        <Link to={"/simpleform"}>Simple Form</Link>
                    </li>
                    <h2>Practice</h2>
                    <li>
                        <Link to={"/register-form"}>Register Form</Link>
                    </li>
                    <li>
                        <Link to={"/validate-form"}>Validate Form</Link>
                    </li>
                    <li>
                        <Link to={"/validate-form-login"}>Validate Form Login</Link>
                    </li>
                    <li>
                        <Link to={"/validate-form-login-formik"}>Validate Form Login Formik</Link>
                    </li>
                    <h2>Exercise</h2>
                    <li>
                        <Link to={"/contact-form-formik"}>Contact Form Login Formik</Link>
                    </li>
                    <li>
                        <Link to={"/book-manager-formik"}>Book Manager Formik</Link>
                    </li>


                </ul>
            </nav>

            <Routes>

                <Route path="/" element={<h1 style={{
                    textAlign: 'center',
                    padding: 20
                }}>Please choose the practice!</h1>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/fileupload" element={<FileUploadPage/>}/>
                <Route path="/validation" element={<Validation/>}/>
                <Route path="/simpleform" element={<SimpleForm/>}/>
                <Route path="/register-form" element={<RegisterForm/>}/>
                <Route path="/validate-form" element={<ValidateForm/>}/>
                <Route path="/validate-form-login" element={<ValidateFormLogin/>}/>
                <Route path="/validate-form-login-formik" element={<ValidateFormLoginFormik/>}/>
                <Route path="/contact-form-formik" element={<ContactForm/>}/>
                <Route path="/book-manager-formik" element={<BookManager/>}/>
            </Routes>


        </div>
    )


}


export default App;
