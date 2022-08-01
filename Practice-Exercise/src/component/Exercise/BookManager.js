import {useFormik} from "formik";
import * as yup from "yup";
import * as styles from "./BookManager.module.css";
import {useState, useRef} from "react";


let initialValues = {
    title: "",
    quantity: ""
}


const validate = values => {

}


const validationSchema = yup.object({
    title: yup.string().required("Required !"),
    quantity: yup.number().typeError("Quantity must be number").required("Required !")


});

const saveToLocalStorage = books => {
    localStorage.setItem("books", JSON.stringify(books))
}

const getFromLocalStorage = () => {
    let books = localStorage.getItem("books");
    return JSON.parse(books);
}

function BookManager() {
    const [books, setBooks] = useState(getFromLocalStorage() || []);
    const [isEdit, setIsEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();

    const titleRef = useRef()

    const onSubmit = (values, {resetForm}) => {
        if (isEdit) {
            setBooks(prevBooks => {
                const newBooks = [...prevBooks]
                newBooks.splice(idEdit, 1, values);
                return newBooks;
            });


        } else {
            setBooks(prevBooks => [...prevBooks, values]);
        }
        console.log("booksss", books)
        setBooks(preBooks => {
            saveToLocalStorage(preBooks);
            return preBooks;
        });
        console.log(values)
        resetForm();
        setIsEdit(false);
        setIdEdit(undefined);
    }

    const handleEdit = index => {
        setIsEdit(true);
        setIdEdit(index);
        Object.keys(formik.values)
            .forEach(key => formik.setFieldValue(key, books[index][key]))
    }

    const handleDelete = index => {

        window.confirm(`You sure to delete ${books[index].title} ` ) &&
        setBooks(preBooks => {
            return preBooks.filter((book, inx) => inx !== index)
        });

        setBooks(preBooks => {
            saveToLocalStorage(preBooks);
            return preBooks;
        });

    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <div style={{
            marginLeft: 30,
            width: "400px",
        }}>
            <h1>Library</h1>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text"
                       ref={titleRef}
                       id={"title"}
                       name={"title"}
                       value={formik.values.title}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                <div className={"error"}>
                    <p>{formik.touched.title && formik.errors.title}</p>
                </div>

                <label htmlFor="quantity">Quantity</label>
                <input type="number"
                       id={"quantity"}
                       name={"quantity"}
                       {...formik.getFieldProps("quantity")}
                />
                <div className={"error"}>
                    <p>{formik.touched.quantity && formik.errors.quantity}</p>
                </div>

                <button type={"submit"}>{isEdit ? "Update" : "Submit"}</button>


            </form>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Number</th>
                    <th colSpan={2}>Action</th>
                </tr>

                </thead>
                <tbody>
                {
                    books.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book.title}</td>
                                <td>{book.quantity}</td>
                                <td>
                                    <button onClick={() => handleEdit(index)}>Edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(index)}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>
    );
}

export default BookManager;