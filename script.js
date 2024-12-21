let config;
const gridElement = document.getElementById("bingo-grid");
const subtitleElement = document.getElementById("subtitle");
const footerElement = document.getElementById("footer-text");

fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
        config = data;
        initializeGame();
    });

function initializeGame() {
    const words = getRandomWords(config.words, 4);
    subtitleElement.textContent = config.subtitle;
    footerElement.textContent = config.footer;

    words.forEach((word) => {
        const cell = document.createElement("div");
        cell.textContent = word;
        cell.addEventListener("click", () => addPhoto(cell, word));
        gridElement.appendChild(cell);
    });
}

function getRandomWords(wordList, count) {
    return wordList.sort(() => 0.5 - Math.random()).slice(0, count);
}

function addPhoto(cell, word) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            cell.innerHTML = `<img src="${reader.result}" alt="${word}"><span>${word}</span>`;
            checkWin();
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function checkWin() {
    const images = gridElement.querySelectorAll("img");
    if (images.length === 4) {
        document.body.innerHTML = `<h1>🎉 You Win! 🎉</h1>`;
    }
}