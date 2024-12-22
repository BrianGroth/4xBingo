let config;

// Load JSON file when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetch("config.json")
        .then((response) => response.json())
        .then((data) => {
            config = data;
            displayCurrentJson(config);
            initializeAdmin(config);
        })
        .catch((error) => console.error("Error loading config.json:", error));
});

// Populate the admin form with current JSON data
function initializeAdmin(config) {
    document.getElementById("word-list").value = config.words.join(", ");
    document.getElementById("subtitle").value = config.subtitle;
    document.getElementById("footer-text").value = config.footer;

    document.getElementById("save-config").addEventListener("click", saveConfig);
}

// Save the updated configuration and display it
function saveConfig() {
    const updatedConfig = {
        words: document.getElementById("word-list").value.split(",").map((word) => word.trim()),
        subtitle: document.getElementById("subtitle").value,
        footer: document.getElementById("footer-text").value,
    };

    displayUpdatedJson(updatedConfig);
}

// Display the current JSON configuration
function displayCurrentJson(config) {
    const currentJsonElement = document.getElementById("current-json");
    currentJsonElement.textContent = JSON.stringify(config, null, 2);
}

// Display the updated JSON configuration
function displayUpdatedJson(updatedConfig) {
    const updatedJsonElement = document.getElementById("updated-json");
    updatedJsonElement.textContent = JSON.stringify(updatedConfig, null, 2);
    alert("Configuration updated! Copy the JSON below.");
}