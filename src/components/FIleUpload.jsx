import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function FileUpload({setLink}) {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const { uploadFile } = useAuth();

    // Handles file upload event and updates state
    async function handleUpload(event) {
        console.log("FILE SENT TO UPLOAD: ");
        const link = await uploadFile(event.target.files[0]);
        console.log("FILE LINK TO DOWNLOAD: " + link);
        setLink(link);
        setFile(event.target.files[0]);
    }

    return (
        <div id="upload-box">
            <input type="file" onChange={handleUpload} accept={'image/*'} />
            <p>Filename: {file.name}</p>
            <p>File type: {file.type}</p>
            <p>File size: {file.size} bytes</p>
            {file && <ImageThumb image={file} />}
        </div>
    );
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} style={{maxWidth:'20rem'}} />;
};
