import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";


// Write config for formik outside component to no re-render
const initialValues = {
    name: "",
    email: ""
};
const onSubmit = values => {
    // this method will handle onSubmit with formik.handleSubmit
    console.log(values)
};

const validate = values => {
    /*validate: method
    * input: values
    * do: validate
    * output: erros
    * */
    // values.name values.email
    // errors.name errors.email
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
    email: Yup.string().email("Invalid email format! yup").required("Required! yup")
});


function SortSimpleForm(props) {


    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema
    })

    // console.log(formik.values)
    // console.log("Errors formik", formik.errors)

    /*
     {...formik.getFieldProps("email")} === 
     onChange={formik.handleChange}
      value={formik.values.name}
      onBlur={formik.handleBlur}
     1 cái getFieldProps bằng 3 cái dưới cộng lại
    */


    console.log("Visited filed formik", formik.touched)
    return (
        <div className="App">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">First name:</label><br/>
                <input type="text" id="name" name="name" placeholder="John"
                       {...formik.getFieldProps("name")}
                />
                <p className={"error"}>{formik.touched.name && formik.errors.name || null}</p>
                <br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="email" id="email" name="email" placeholder="Doe"
                       {...formik.getFieldProps("email")}


                />
                <br/>
                <p className={"error"}>{formik.touched.email && formik.errors.email || null}</p>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
}

export default SortSimpleForm;