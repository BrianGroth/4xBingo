document.addEventListener("DOMContentLoaded", () => {
    loadConfig();
});

async function loadConfig() {
    try {
        const response = await fetch("config.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const config = await response.json();
        displayCurrentJson(config);
        populateForm(config);
    } catch (error) {
        console.error("Error loading config.json:", error);
    }
}

function populateForm(config) {
    document.getElementById("word-list").value = config.words.join(", ");
    document.getElementById("subtitle").value = config.subtitle;
    document.getElementById("footer-text").value = config.footer;

    document.getElementById("save-config").addEventListener("click", () => saveConfig(config));
}

function saveConfig(config) {
    const updatedConfig = {
        words: document.getElementById("word-list").value.split(",").map((word) => word.trim()),
        subtitle: document.getElementById("subtitle").value,
        footer: document.getElementById("footer-text").value,
    };

    displayUpdatedJson(updatedConfig);
}

function displayCurrentJson(config) {
    const currentJsonElement = document.getElementById("current-json");
    currentJsonElement.textContent = JSON.stringify(config, null, 2);
}

function displayUpdatedJson(updatedConfig) {
    const updatedJsonElement = document.getElementById("updated-json");
    updatedJsonElement.textContent = JSON.stringify(updatedConfig, null, 2);
    alert("Configuration updated! Copy the JSON below.");
}