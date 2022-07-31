import {useFormik} from "formik";
import * as yup from "yup";

const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
}

const onSubmit = values => {
    console.log(values)
}

// Using normal validate by formik
const validate = values => {
    let errors = {}
    // validate name
    if (!values.name) {
        errors.name = "Required"
    }
    // validate email
    if (!values.email) {
        errors.email = "Required"
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gim).test(values.email)) {
        errors.email = "Invalid email format!";
    }
    // validate phone
    if (!values.phone) {
        errors.phone = "Required"
    }
    if (values.phone.length < 10) {
        errors.phone = "Phone must be at least 10 number!"

    }

    if (values.message.length < 10) {
        errors.message = "Message must be at least 10 character!"

    }
    return errors;
}

// Using up schema to validate form
// yup validationSchema will sort error validate by order sort
const validationSchema = yup.object({
    name: yup.string().required("Required ! by yup"),
    email: yup.string().email("Invalid email format?! by yup").required("Required! by yup"),
    phone: yup.number()
        .typeError('Phone must be a number')
        .required("Required! by yup")
        .test("len", "Number must be at least 10, by yup", val => val && val.toString().length >= 10),

    message: yup.string().min(10, "Message must be at least 10, by yup").required("Required! by yup")
})


function ContactForm() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema
    })


    return (
        <div className={"App"}>
            <h1>Contact Form</h1>
            <form onSubmit={formik.handleSubmit}>
                {/*Name*/}
                <label htmlFor="name">Name</label>
                <input type="text"
                       name={"name"}
                       id={"name"}
                       value={formik.values.name}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                <div className={"error"}>
                    <p>{formik.touched.name && formik.errors.name}</p>
                </div>

                {/*Email*/}
                <label htmlFor="email">Email</label>
                <input type="email"
                       id={"email"}
                       name={"email"}
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                <div className="error">
                    <p>{formik.touched.email && formik.errors.email}</p>
                </div>

                {/*Phone number*/}

                <label htmlFor="phone">Phone</label>
                <input type="text"
                       id={"phone"}
                       name={"phone"}
                       value={formik.values.phone}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />

                <div className="error">
                    <p>{formik.touched.phone && formik.errors.phone}</p>
                </div>

                {/*messange*/}
                <label htmlFor="message">Message</label>
                <textarea
                    id={"message"}
                    name={"message"}
                    /*value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}*/
                    /*sorthand*/
                    {...formik.getFieldProps("message")}
                />

                <div className="error">
                    <p>{formik.touched.message && formik.errors.message}</p>
                </div>
                <button type={"submit"}>Submit</button>
            </form>

        </div>
    )
}

export default ContactForm;