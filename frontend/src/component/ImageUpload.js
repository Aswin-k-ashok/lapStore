import React, { useState } from 'react';
import axios from 'axios'


function ImageUpload() {

    const [imageSelected, setImageSelected] = useState('')

    const upload = () => {
        const formData = new FormData()
        formData.append('file', imageSelected)
        formData.append("upload_preset", "lapStore")

        axios.post("https://api.cloudinary.com/v1_1/dnjctkdet/image/upload", formData).then((res) => {
            console.log(res.data.url);
        })
    }

    return (
        <div>
            <input type='file' onChange={(e) => {
                setImageSelected(e.target.files[0])
            }} />
            <button onClick={upload}>Add The Image</button>

        </div>
    );
}

export default ImageUpload;
