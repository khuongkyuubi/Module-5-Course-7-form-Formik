import {useFormik} from "formik";
import {useState, useRef} from "react";
import * as yup from "yup";

const initialValues = {
    to: "",
    title: "",
    message: "",
    attack: ""
}

const onSubmit = (values, {resetForm, setFieldValue}) => {
    resetForm();
    console.log(values);
    alert("Send mail ok!")
}

const validate = values => {

}

const validationSchema = yup.object({
    to: yup.string().email("Invalid email format").required("Required!"),
    title: yup.string().required("Required!"),
    message: yup.string().min(10, "Message must be at least 10 character!").required("Required!")
})

function ComposeMail() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


    return (
        <div className={"Left"}>
            <h1>Mail Compose</h1>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="to">To</label>
                <input id="to"
                       name="to"
                       type="email"
                       value={formik.values.to}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                <p className={"error"}>{formik.touched.to && formik.errors.to || null}
                </p>

                <label htmlFor="title">Title</label>
                <input id="title"
                       name="title"
                       type="text"
                       {...formik.getFieldProps("title")}
                />
                <p className={"error"}>{formik.touched.title && formik.errors.title || null}
                </p>

                <label htmlFor="message">Message</label>
                <textarea id="message"
                          rows="5"
                          cols="47"
                          name="message"
                          {...formik.getFieldProps("message")}
                />
                <p className={"error"}>{formik.touched.message && formik.errors.message || null}
                </p>

                <label htmlFor="attack">Attack</label>

                <input id="attack"
                       name="attack"
                       type="file"
                       onChange={(event) => {
                           formik.setFieldValue("attack", event.target.files[0]);
                           event.target.value = null

                       }}

                />
                {formik.values.attack && <p><small>{formik.values.attack.name}</small></p>}
                <p className={"error"}>{formik.touched.attack && formik.errors.attack || null}
                </p>

                <button type={"submit"}>Send</button>
            </form>
        </div>
    );
}

export default ComposeMail;