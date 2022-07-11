import React from "react";
import { useState } from "react";
import TranscriptedText from "./transcriptedText";

function TranscriptedTextPanel({textList, handleDelete}) {
    var displayTexts = textList;

    return (
        <div className="transcripted-text-panel">
            <h2 className="transcripted-text-header">Transcripted text</h2>
            <div>
            {
                textList.map(({id, tText}) => <TranscriptedText key={id} displayText={tText} id={id} handleDelete={handleDelete} />)
            }
            </div>
        </div>
    );

}

export default TranscriptedTextPanel;