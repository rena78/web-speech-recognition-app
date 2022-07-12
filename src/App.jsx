import { useState } from 'react';
import './App.css';
import SpeechRecognitionHandler from './components/speechRecognitionHandler';
import TranscriptedTextPanel from './components/transcriptedTextPanel';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-AR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function App() {
  const [transcriptedTextList, setTranscriptedTextList] = useState([{id:0, tText:"aaa"}]);   //  lista de textos -> panel -> texto
  const [transcriptedTextCount, setTranscriptedTextCount] = useState(1);  //  para key unica

  //  delete a text with id === param
  function handleDelete({ textId }) {
    let list = transcriptedTextList.filter(elem => elem.id !== textId);   //  shortened
    setTranscriptedTextList(list);

    console.log("Deleted text");
  }

  //  add a new text "param"
  function addTranscriptedText(text) {
    let list = [...transcriptedTextList, { id: transcriptedTextCount, tText: text }];  //  shortened
    setTranscriptedTextList(list);
    setTranscriptedTextCount(transcriptedTextCount + 1);

    console.log("Added transcripted text: " + text);
  }

  //  combines all texts in transcriptedTextList
  function mergeVisibleTexts() {
    let finalText = transcriptedTextList.map(elem => elem.tText).join(' ');   //  shortened
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