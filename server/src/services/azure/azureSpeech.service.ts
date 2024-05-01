import { v4 } from "uuid";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";
import { appConfig } from "../../configs";

const ttsDialogue = ({
  dialoguesTTS,
}: {
  dialoguesTTS: {
    text: string;
    voice: string;
    language: string;
  }[];
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filename = `${v4()}.mp3`;
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      appConfig.azureSpeech.key,
      appConfig.azureSpeech.region
    );

    speechConfig.speechSynthesisOutputFormat = 5;

    // Create SSML
    let ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="en-US-AvaNeural"> <break time="10ms" /> </voice>
      ${dialoguesTTS
        .map(
          ({ text, voice }) =>
            `<voice name="${voice}">
               <prosody rate="0%" >
                ${text}
               </prosody>
              </voice>`
        )
        .join("\n")}
      <voice name="en-US-AvaNeural"> <break time="1250ms" /> </voice>
    </speak>`;

    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        synthesizer.close();
        // return stream from file
        // const audioFile = fs.createReadStream(filename);
        resolve(filename);
      },
      (error) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
};

export const azureSpeechService = {
  ttsDialogue,
};
