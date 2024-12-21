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

    const blob = new Blob([JSON.stringify(updatedConfig, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    a.click();
    URL.revokeObjectURL(url);

    alert("Configuration saved. Upload the new config.json to your repository.");
}