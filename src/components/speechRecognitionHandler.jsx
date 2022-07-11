import React, { useState } from 'react'
import '../App.css'

function SpeechRecognitionHandler({recognition, addTextFunc, mergeTextsFunc}) {

    const [capturedText, setCapturedText] = useState({text:""});
    
    const [recognitionState, setRecognitionState] = useState({isOn: false, isReady: true});

    recognition.onresult = function (event) {
        if (!recognitionState.isOn || !recognitionState.isReady)
            return;
        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;

        if (transcript != "" || transcript != null) {
            var finalText = event.results[0][0].transcript;;

            for (let i = 1; i <= current; i++) {
                transcript = event.results[i][0].transcript;
                finalText += " " + transcript;
            }
            setCapturedText({text:finalText});
        }
    }

    recognition.onstart = function () {
        setRecognitionState({isOn: true, isReady: true});
        console.log("Started recognition");
    }

    recognition.onend = function () {
        setRecognitionState({isOn: false, isReady: true});
        console.log("Ended recognition");
    }

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            console.log("No speech detected");
        };
    }

    const handleStopButton = () => {
        if (!recognitionState.isOn || !recognitionState.isReady)
            return;
        
        setRecognitionState({isOn: false, isReady: false});

        recognition.stop();
        recognition.abort();
        
        if (capturedText.text != "")
            addTextFunc(capturedText.text);
        setCapturedText({text:""});
    }

    const handleStartButon = () => {
        if (recognitionState.isOn || !recognitionState.isReady)
            return;
            
        setRecognitionState({isOn: true, isReady: false});
        recognition.start();
    }

    const getStartButtonColor = () => {
        if (recognitionState.isOn || !recognitionState.isReady)
            return "recording-button-pressed"
        else
            return "recording-button"
    }

    const getStopButtonColor = () => {
        if (!recognitionState.isOn || !recognitionState.isReady)
            return "recording-button-pressed"
        else
            return "recording-button"
    }

    return (
        <React.Fragment>
            <button onClick={handleStartButon} className={getStartButtonColor()}>On</button>
            <button onClick={handleStopButton} className={getStopButtonColor()}>Off</button>
            <button onClick={mergeTextsFunc} className={"recording-button"}> txt+txt </button>
        </React.Fragment>
    );
}

export default SpeechRecognitionHandler;