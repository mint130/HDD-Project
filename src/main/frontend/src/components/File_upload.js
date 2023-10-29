import React, {useEffect, useRef, useState} from 'react';

const File_upload=({onFileUpload})=>{

    const [image, setImage]=useState(null);

    const onImageUpload = (e: any) =>{
        const file= e.target.files[0];
        //console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
            // 부모 컴포넌트로 업로드된 파일의 정보 전달
            onFileUpload({
                file: file,
                imageUrl: reader.result,
                imageName: file.name,
            });
        };

    }
    return (
        <div>
            <input accept="image/*"
                   multiple type="file"
                   onChange={e=>onImageUpload(e)}
            />
            {image && <img src={image}/>}
        </div>
    );

}

export default File_upload;