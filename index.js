"use strict";

const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "271e460293d948109dae049355326bfc",
    src: joke,
    hl: "en-us",
    v: "Mike",
    r: -1,
    c: "mp3",
    f: "ulaw_44khz_stereo",
    ssml: false,
  });
};

// Get Jokes from VoiceRSS API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log("Whoops", error.message);
  }
}

button.addEventListener("click", () => getJokes());
audioElement.addEventListener("ended", toggleButton);
