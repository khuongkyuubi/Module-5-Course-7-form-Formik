import {useState} from "react";

function Validation() {

    const [form, setForm] = useState({
        name: "",
        age: null,
        error: ""
    })

    const handleChange = event => {
        let name = event.target.name;
        let val = event.target.value;
        let err = form.error;
        if (name === "age") {
            if (val !== "" && !Number(val)) {
                err = "Your age must be a number";
            } else {
                err = "";
            }
        }
        setForm({...form, [name]: val, error: err});
    };


    return (
        <form>
            <h1>
                Hello {form.username} {form.age}
            </h1>
            <p>Enter your name:</p>
            <input type="text" name="username" onChange={handleChange}/>
            <p>Enter your age:</p>
            <input type="text" name="age" onChange={handleChange}/>
            {form.error}
        </form>
    )
}

export default Validation;