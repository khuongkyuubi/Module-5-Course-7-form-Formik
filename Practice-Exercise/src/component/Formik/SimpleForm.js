import React from 'react';
// import {useFormik} from "formik";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from "formik";
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
    phoneNumber: ["", ""],
    phNumbers: [""]
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

// Field Level Validation
const validateComments = value => {
    let error
    if (!value) {
        error = "Required! by field level validation"
    }
    return error;
}

function SimpleForm(props) {

    return (
        <div className={"App"}>
            <Formik
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                initialValues={initialValues}
                validateOnChange={true}
                validateOnBlur={true}
                // validateOnMount
            >
                {
                    formik => {
                        console.log("formik props", formik)
                        return (
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
                                       validate={validateComments}
                                />
                                <br/>
                                <ErrorMessage name={"comments"} component={TextError}/>


                                {/*other way to make formik form*/}
                                <label htmlFor="address">Adress:</label><br/>
                                <FastField
                                    name="address"
                                    id={"address"}
                                >
                                    {(props) => {
                                        // console.log("Field Render!")
                                        // console.log("render props", props)
                                        const {field, form, meta} = props
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
                                </FastField>
                                <br/>

                                <div>
                                    <label htmlFor="facebook">Facebok profiles</label>
                                    <Field type={"text"} id="facebook" name="social.facebook"/>
                                </div>
                                <div>
                                    <label htmlFor="twitter">Twitter profiles</label>
                                    <Field type={"text"} id="twitter" name="social.twitter"/>
                                </div>

                                {/*Phone feild*/}

                                <div>
                                    <label htmlFor="primaryPh">Primary phone number</label>
                                    <Field type={"text"} id="primaryPh" name="phoneNumber[0]"/>
                                </div>

                                <div>
                                    <label htmlFor="secondaryPh">Secondary phone number</label>
                                    <Field type={"text"} id="secondaryPh" name="phoneNumber[1]"/>
                                </div>

                                {/*Dynamic array fields*/}
                                <div>
                                    <label htmlFor={"phNumbers"}>List of phone numbers</label>
                                    <FieldArray name="phNumbers" id="phNumbers">
                                        {
                                            (fieldArrayProps) => {
                                                // console.log("fieldArrayProps", fieldArrayProps);

                                                // Lấy ra các giá trị và method mong muốn từ fieldArrayProps
                                                const {push, remove, form} = fieldArrayProps;
                                                const {values} = form;
                                                const {phNumbers} = values;
                                                // console.log("Form errors", form.errors)

                                                return <div>

                                                    {
                                                        phNumbers.map((phNumber, index) => (
                                                            <div key={index}>
                                                                <Field name={`phNumbers[${index}]`}/>
                                                                {index > 0 && <button
                                                                    type={"button"}
                                                                    onClick={() => remove(index)}
                                                                > -
                                                                </button>}
                                                                <button
                                                                    type={"button"}
                                                                    onClick={() => push("")}
                                                                > +
                                                                </button>
                                                            </div>
                                                        ))
                                                    }
                                                    <button
                                                        type="button"
                                                        onClick={() => push("")}
                                                    >Add new
                                                    </button>
                                                </div>
                                            }
                                        }
                                    </FieldArray>
                                </div>

                                <button type={"button"}
                                        onClick={(e) => formik.setFieldTouched("comments")}
                                >
                                    Visit Comments
                                </button>
                                <button type={"button"}
                                        onClick={() => formik.setTouched({
                                            name: true,
                                            email : true,
                                            comments: true
                                        })}
                                >
                                    Visit All
                                </button>
                                <br/>

                                <button type={"button"}
                                        onClick={(e) => formik.validateField("comments")}
                                >
                                    Validate Comments
                                </button>
                                <button type={"button"}
                                        onClick={() => formik.validateForm()}
                                >
                                    Validate All
                                </button>
                                {/*isValid kiểm tra xem các trường đẫ hợp lệ hay chưa*/}
                                {/*<button type={"submit"} disabled={!formik.isValid} >Submit</button>*/}
                                <button type={"submit"} disabled={!(formik.dirty && formik.isValid)} >Submit</button>


                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default SimpleForm;