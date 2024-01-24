console.log("Hello, world!");

const textarea = document.querySelector("textarea");
const results = document.getElementById("results");

textarea.addEventListener("change", updateValue);

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

function updateValue(e) {
  const updatedLines = processLines(e.target.value);

  updatedLines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    results.appendChild(p);
  });
}
