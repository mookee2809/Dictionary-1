// fetching the definition by API
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// Api will listen from btn click
btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    sound.src = ""; sound.load();
    fetch(`${url}${inpWord}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let wordData = data[0];
        // Because the synonyms lies in diffrent sections so we have to check all section with this
            let allSynonyms = [];
            let allAntonyms = [];

            wordData.meanings.forEach(meaning => {
                allSynonyms.push(...meaning.synonyms);
                allAntonyms.push(...meaning.antonyms);
            });
        // If we cant find the word then it prints out "None"      
            let synonymsText = allSynonyms.length > 0 ? allSynonyms.join(', ') : "No Synonyms";
            let antonymsText = allAntonyms.length > 0 ? allAntonyms.join(', ') : "No Antonyms";

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${wordData.meanings[0].partOfSpeech}</p>
                    <p>/${wordData.phonetics[0].text}/</p>
                </div>
                <p class="word-meaning">
                    ${wordData.meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${wordData.meanings[0].definitions[0].example || ""}
                </p>
                <p class="synonyms">
                    Synonyms: ${synonymsText}
                </p>
                <p class="antonyms">
                    Antonyms: ${antonymsText}
                </p>
            `;

            
// Find the first phonetic entry with a non-empty 'audio' field
const audioEntry = data[0].phonetics.find(phonetic => phonetic.audio);

// Set the audio source only if a valid audio URL is found
if (audioEntry && audioEntry.audio) {
    sound.setAttribute("src", audioEntry.audio);
    document.getElementById("sound").style.display = "block";
} else {
    document.getElementById("sound").style.display = "none";
    console.log("No audio available for this word.");
}

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// This plays sound but if we dont have the audio, print h3
function playSound() {
    if (sound.src && sound.src !== "") {
        sound.play().catch(e => {
            result.innerHTML= `<h3 class="error">No sound for this words</h3>`;
        });
    } else {
        console.log("Setting audio source to:", audioUrl);if (audioUrl && audioUrl !== "") {    sound.setAttribute("src", audioUrl);    console.log("Audio source set. Attempting to play...");} else {    console.log("No valid audio URL provided.");}
}};