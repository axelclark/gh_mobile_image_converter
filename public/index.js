function processLines(input) {
  const lines = input.split("\n").filter((line) => line !== "");

  const updatedLines = lines.map((line) => {
    if (line.startsWith("![")) {
      const remaining = line.replace("![", "");
      const [alt_text, src] = remaining.split("](");
      const [url, _rest] = src.split(")");
      return `<img src="${url}" alt="${alt_text}" width="300"><br/>`;
    } else return line;
  });

  return updatedLines;
}

function updateOutput() {
  const updatedLines = processLines(textarea.value);

  const newParagraphs = updatedLines.map((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    return p;
  });

  results.replaceChildren(...newParagraphs);
}

function handleSubmit(event) {
  updateOutput();
  event.preventDefault();
}

const textarea = document.querySelector("textarea");
const results = document.getElementById("results");

textarea.addEventListener("change", updateOutput);

const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

const copyButton = document.getElementById("copy");

copyButton.addEventListener("click", (_event) => {
  if ("clipboard" in navigator) {
    console.log(results.textContent);
    let trimmedText = results.textContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    navigator.clipboard.writeText(trimmedText);
  } else {
    alert("Sorry, your browser does not support clipboard copy.");
  }
});
