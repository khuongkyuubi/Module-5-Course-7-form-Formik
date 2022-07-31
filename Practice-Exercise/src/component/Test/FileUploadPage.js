import {useState} from "react";

function FileUploadPage() {
    const [file, setFile] = useState();
    const [isFile, setIsFile] = useState(false);

    const handleChange = event => {
        setFile(event.target.files[0]);
        setIsFile(true)
    }

    const handleSubmit = () => {
        alert(isFile ? "File upload successful" : "No file selected");
        console.log(file)
    }
    return (


        <div className="App">
            <p>Choose a file</p>
            <input type="file"
                   name={"name"}
                   onChange={handleChange}
            />
            <button onClick={handleSubmit}>Upload</button>

            {
                isFile &&
                <div style={{
                    marginLeft: "10%",
                    textAlign: "left"
                }}>
                    <h2>File info</h2>
                    <p>File name: {file.name}</p>
                    <p>File type: {file.type}</p>
                    <p>Size in bytes: {
                        file.size
                    }</p>
                    <p>
                        Last Modified Date: &nbsp;
                        {file.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>


            }

        </div>


    )


}

export default FileUploadPage;