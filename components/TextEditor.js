import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import {EditorState, convertFromRaw,convertToRaw} from 'draft-js';
import { useEffect, useState } from "react";
import {db} from '../firebase';
import {useSession} from 'next-auth/client'
import { useRouter } from "next/dist/client/router";
import {useDocumentOnce} from 'react-firebase-hooks/firestore'


const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), { ssr: false} )

function TextEditor() {
    const [session] = useSession();
    const router = useRouter();
    const {id} = router.query;
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) =>{
        setEditorState(editorState);
        db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id).set({
             editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        })
    }
    const [snapshot] = useDocumentOnce(db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id));

    useEffect(() => {
        if(snapshot?.data()?.editorState){
            setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)))
        }
    }, [snapshot])

    
    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-16 ">
            
            <Editor
            toolbarClassName=" sticky top-0 flex !justify-center "
            editorClassName="mt-6 max-w-3xl bg-white mx-auto shadow-lg border mb-12 p-10"
            editorState={editorState}
            onEditorStateChange = {onEditorStateChange}
             />
        </div>
    )
}

export default TextEditor
