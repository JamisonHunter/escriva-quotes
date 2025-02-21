document.getElementById("fetch-quote").addEventListener("click", async function() {
    const sources = ["Furrow", "Forge", "Way"];
    let selectedSources = sources.filter(source => document.getElementById(source.toLowerCase()).checked);

    if (selectedSources.length === 0) {
        alert("Please select at least one source.");
        return;
    }

    let folder = selectedSources[Math.floor(Math.random() * selectedSources.length)]; // Pick a random folder
    let fileCount = await getFileCount(folder); 
    let randomIndex = Math.floor(Math.random() * fileCount) + 1;
    let fileName = `${folder.toLowerCase()}-${randomIndex}.txt`;
    console.log(folder.length);

    try {
        let response = await fetch(`${folder}/${fileName}`);
        if (!response.ok) throw new Error("Quote not found");

        let text = await response.text();
        let lines = text.split("\n");

        document.getElementById("title").innerText = `${folder} #${lines[0] || "???"}`;
        document.getElementById("line-1").innerText = lines[1] || "No content found";
        document.getElementById("line-2").innerText = lines[2] || ""; // Show second line if available

    } catch (error) {
        alert("Could not fetch quote. Ensure the file exists.");
    }

    async function getFileCount(folder) {
        try {
            let response = await fetch("filecount.json");
            let data = await response.json();
            return data[folder] || 999;
        } catch (error) {
            console.error("Error fetching file count:", error);
            return 100;
        }
    }
    
});
