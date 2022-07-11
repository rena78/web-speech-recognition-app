import { useState } from 'react';
import './App.css';
import SpeechRecognitionHandler from './components/speechRecognitionHandler';
import TranscriptedTextPanel from './components/transcriptedTextPanel';

function App() {
  //  reconocimiento
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  
  let recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'es-AR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const [transcriptedTextList, setTranscriptedTextList] = useState([{id:0, tText:"TEST"}]);   //  lista de textos -> panel -> texto
  const [transcriptedTextCount, setTranscriptedTextCount] = useState(1);                      //  para key unica (mal)

  function handleDelete({ textId }) {
    var list = [];
    transcriptedTextList.forEach(({ id, tText }) => {
      if (id !== textId) {
        list.push({ id, tText });
      }
      else {
        console.log("Deleting text ID: " + textId + " (" + tText + ")");
      }
    });
    setTranscriptedTextList(list);
  }

  function addTranscriptedText(text) {
    var list = [];
    transcriptedTextList.forEach(element => {
      list.push(element);
    });
    list.push({ id: transcriptedTextCount, tText: text });
    setTranscriptedTextCount(transcriptedTextCount + 1);
    setTranscriptedTextList(list);
    console.log("Adding transcripted text: " + text);
  }

  function mergeVisibleTexts() {
    var finalText = "";
    transcriptedTextList.forEach(element => {
      finalText += " " +  element.tText;
    });
    setTranscriptedTextList([{id: transcriptedTextCount, tText:finalText}]);
    setTranscriptedTextCount(transcriptedTextCount+1);
    console.log("Merged texts");
  }

  return (
    <div className="App">

      <div className="header">
        <h1>Speech to Text App</h1>
      </div>

      <div className="app-container">
        <div className="transcripted-text-section">
          <TranscriptedTextPanel textList={transcriptedTextList} handleDelete={handleDelete}/>

        </div>

        <div className="buttons-section">
          <SpeechRecognitionHandler recognition={recognition} addTextFunc={addTranscriptedText} mergeTextsFunc={mergeVisibleTexts}/>
        </div>
      </div>
    </div>
  )
}

export default App;