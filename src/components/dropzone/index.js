import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import "./styles.css";

const dropzone = (props) => {
    return (
        <div className="dropzone" >
            <Dropzone onDrop={props.handlerFile} >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                         <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default dropzone;

