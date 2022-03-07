import React, { useState } from 'react';
import Editor from './src/components/Editor';
import BaseDocument from './src/utils/BaseDocument';
import { useLocation } from 'react-router-dom';

export default function Main (props){
    const [document, updateDocument] = useState(getState());

    function getState() {
        const { state } = useLocation();
        if (state === null){
            return BaseDocument;
        } else {
            return JSON.parse(state);
        }
    }

    return (
        <>
            <Editor document={document} onChange={updateDocument} />   
        </>
    );
    
}