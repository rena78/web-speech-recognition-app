import React from "react";
import TranscriptedTextPanel from "./transcriptedTextPanel";

function TranscriptedText({ id, displayText, handleDelete }) {
    return (
        <div className="transcripted-text">
            <p>{displayText}</p>
            <button onClick={() => handleDelete({ textId: id })} className="delete-text-button">X</button>
        </div>
    );
}

export default TranscriptedText;// = <button onClick={HandleDelete()} className="delete-text-button">X</button>