let config;

fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
        config = data;
        initializeAdmin();
    });

function initializeAdmin() {
    document.getElementById("word-list").value = config.words.join(", ");
    document.getElementById("subtitle").value = config.subtitle;
    document.getElementById("footer-text").value = config.footer;

    document.getElementById("save-config").addEventListener("click", saveConfig);
}

function saveConfig() {
    const updatedConfig = {
        words: document.getElementById("word-list").value.split(",").map((word) => word.trim()),
        subtitle: document.getElementById("subtitle").value,
        footer: document.getElementById("footer-text").value,
    };

    // Display updated JSON
    const updatedJsonElement = document.getElementById("updated-json");
    updatedJsonElement.textContent = JSON.stringify(updatedConfig, null, 2);

    alert("Configuration updated! Copy the JSON below and upload it to your GitHub app.");
}