import React from 'react';
// import {useFormik} from "formik";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import TextError from "./TextError";

// Form -> insttead form tag
// Fiels -> include : handleChange, handleBlur , value (same formik.getFiledsProps)

// ErrorMessage -> same with formik.touched and formik.errors


// Write config for formik outside component to no re-render
const initialValues = {
    name: "",
    email: "",
    comments: "",
    address: "",
    social: {
        facebook: "",
        twitter: ""
    },
    phoneNumber: ["",""]
};
const onSubmit = values => {
    // this method will handle onSubmit with formik.handleSubmit
    console.log(values)
};

const validate = values => {

    let errors = {};
    // name validate condition
    if (!values.name) {
        errors.name = "Name required!"
    }
    //email validate condition
    if (!values.email) {
        errors.email = "Email required!"
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gim).test(values.email)) {
        errors.email = "Invalid email format!";
    }
    return errors

}

//
const validationSchema = Yup.object({
    name: Yup.string("Name must be string!").required("Required! yup"),
    email: Yup.string().email("Invalid email format! yup").required("Required! yup"),
    address: Yup.string().required("Required")
});


function SimpleForm(props) {

    return (
        <div className={"App"}>
            <Formik
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                initialValues={initialValues}>
                <Form>
                    <label htmlFor="name">First name:</label><br/>
                    <Field type="text" id="name" name="name" placeholder="John"
                    />
                    <br/>
                    <div className={"error"}>
                        <ErrorMessage name={"name"}/>
                    </div>
                    <label htmlFor="email">Email:</label><br/>
                    <Field type="email" id="email" name="email" placeholder="Doe"
                    />
                    <br/>
                    <ErrorMessage name={"email"}>
                        {errorMsg => (<div className={"error"}>
                            {errorMsg
                            }</div>)}
                    </ErrorMessage>


                    <label htmlFor="comments">Comments:</label><br/>
                    {/*with textarea -> using as="textarea" instead type="textarea"*/}
                    <Field as="textarea" id="comments" name="comments" placeholder="comments"
                    />
                    <br/>
                    <ErrorMessage name={"comments"} component={TextError}/>


                    {/*other way to make formik form*/}
                    <label htmlFor="address">Adress:</label><br/>
                    <Field name="address"
                    >
                        {(props) => {
                            const {field, form, meta} = props
                            // console.log("render props", props)
                            return <div>
                                <input
                                    {...field}
                                    type={"text"}
                                    id={"address"}/>
                                <TextError>
                                    {meta.touched && meta.error && <div>{meta.error}</div>}
                                </TextError>
                            </div>
                        }}
                    </Field>
                    <br/>
                    <ErrorMessage name={"comments"} component={TextError}/>

                    <div>
                        <label htmlFor="facebook">Facebok profiles</label>
                        <Field type={"text"} id="facebook" name="social.facebook" />
                    </div>
                    <div>
                        <label htmlFor="twitter">Twitter profiles</label>
                        <Field type={"text"} id="twitter" name="social.twitter" />
                    </div>

                    {/*Phone feild*/}

                    <div>
                        <label htmlFor="primaryPh">Primary phone number</label>
                        <Field type={"text"} id="primaryPh" name="phoneNumber[0]" />
                    </div>

                    <div>
                        <label htmlFor="secondaryPh">Secondary phone number</label>
                        <Field type={"text"} id="secondaryPh" name="phoneNumber[1]" />
                    </div>


                    <button type={"submit"}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default SimpleForm;