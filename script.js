document.addEventListener("DOMContentLoaded", function () {
    fetch("Furrow/furrow-1.txt") 
        .then(response => response.text())
        .then(data => {
            document.getElementById("output").textContent = data;
        })
        .catch(error => console.error("Error loading the file:", error));
});
