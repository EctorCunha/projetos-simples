const main = document.querySelector("main");
const buttonInsertText = document.querySelector(".btn-toggle");
const buttonReadText = document.querySelector("#read");
const divTextBox = document.querySelector(".text-box");
const closeTextBox = document.querySelector(".close");
const selectVoices = document.querySelector("select");
const textArea = document.querySelector("textarea");

// API beta do SpeechSynthesis
const humanExpressions = [
  { img: "./img/drink.jpg", text: "Estou com sede" },
  { img: "./img/food.jpg", text: "Estou com fome" },
  { img: "./img/tired.jpg", text: "Estou cansado" },
  { img: "./img/hurt.jpg", text: "Estou machucado" },
  { img: "./img/happy.jpg", text: "Estou feliz" },
  { img: "./img/angry.jpg", text: "Estou com raiva" },
  { img: "./img/sad.jpg", text: "Estou triste" },
  { img: "./img/scared.jpg", text: "Estou com medo" },
  { img: "./img/outside.jpg", text: "Quero ir lá fora" },
  { img: "./img/home.jpg", text: "Quero ir para casa" },
  { img: "./img/school.jpg", text: "Quero ir para a escola" },
  { img: "./img/grandma.jpg", text: "Quero ver a vovó" },
];

const utterance = new SpeechSynthesisUtterance();

const setTextMessage = (text) => {
  utterance.text = text;
};

const speakText = () => {
  speechSynthesis.speak(utterance);
};

const setVoice = (event) => {
  const selectedVoice = voices.find(
    (voice) => voice.name === event.target.value
  );
  utterance.voice = selectedVoice;
};

const createExpressionBox = ({ img, text }) => {
  const div = document.createElement("div");

  div.classList.add("expression-box");
  div.innerHTML = `
    <img src="${img}" alt="${text}" class="img">
    <p class="info">${text}</p>
    `;

  div.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    div.classList.add("active");
    setTimeout(() => {
      div.classList.remove("active");
    }, 1000);
  });

  main.appendChild(div);
};

humanExpressions.forEach(createExpressionBox);

let voices = [];

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();

  const danielVoice = voices.find(
    (voice) => voice.name === "Microsoft Daniel - Portuguese (Brazil)"
  );
  const mariaVoice = voices.find(
    (voice) => voice.name === "Microsoft Maria - Portuguese (Brazil)"
  );


  voices.forEach(({ name, lang }) => {
    const option = document.createElement("option");
    option.value = name;

    if (danielVoice && option.value === danielVoice.name) {
      utterance.voice = danielVoice;
      option.selected = true;
    } else if (mariaVoice && option.value === mariaVoice.name) {
      utterance.voice = mariaVoice;
      option.selected = true;
    }

    option.textContent = `${lang} - ${name}`;
    selectVoices.appendChild(option);
  });
});

buttonInsertText.addEventListener("click", () => {
  divTextBox.classList.add("show");
});

closeTextBox.addEventListener("click", () => {
  divTextBox.classList.remove("show");
});

selectVoices.addEventListener("change", setVoice);

buttonReadText.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});
