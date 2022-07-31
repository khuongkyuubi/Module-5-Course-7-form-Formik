import {useState} from "react";


function Test() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        console.log([e.target.name])
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Welcome: " + form.username + "\n with password " + form.password);
    }

    return (<div className="App">
            <form action=" " onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input
                    value={form.username}
                    name={"username"}
                    type="text" id="username"
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="password">Name</label>
                <input value={form.password}
                       name={"password"}
                       type="password" id="password"
                       onChange={handleChange}

                />
                <br/>
                <button>Login</button>


            </form>
        </div>
    )


}

export default Test;