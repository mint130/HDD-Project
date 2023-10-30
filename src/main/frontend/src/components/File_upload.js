import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const Img = styled.img`
   width: 280px;
       height: fit-content;
`
const File_upload=({onFileUpload})=>{

    const [image, setImage]=useState(null);
    //const imageInput = useRef();
    //const handleClickFileInput=e=>{
    //    imageInput.current.click();
   // }
    const onImageUpload = (e: any) =>{
        const file= e.target.files[0];
        //useRef 태그로 input 태그에 접근

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
        <>
            <input accept="image/*"
                   multiple type="file"
                   //style={{ display: "none" }}
                   onChange={e=>onImageUpload(e)}

            />

            {image && <Img src={image}/>}
        </>
    );

}

export default File_upload;