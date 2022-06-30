const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const btnAdd = document.getElementById("btnAdd");
const selected = document.querySelector(".selected");
const btnClear = document.getElementById("btnClear");
const btnDownload = document.getElementById("btnDownload");
const btnSend = document.getElementById("btnSend");

btnUpload.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("pdfFile", inpFile.files[0]);
  fetch("/extract-text", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((extractedText) => {
      resultText.value = extractedText;
    });
});

let selectedText;
let selectedArray = [];

resultText.addEventListener("mouseup", (e) => {
  selectedText = "";
  selectedText = window.getSelection().toString().trim();
  if (selectedText.length) {
    const x = e.clientX;
    const y = e.clientY;
    const btnAddWidth = Number(getComputedStyle(btnAdd).width.slice(0, -2));
    const btnAddHeight = Number(getComputedStyle(btnAdd).height.slice(0, -2));
    btnAdd.style.left = `${x}px`;
    btnAdd.style.top = `${y}px`;
    btnAdd.style.display = "block";
  }
});

btnAdd.addEventListener("click", () => {
  const node = document.createElement("li");
  const textnode = document.createTextNode(selectedText.toString());
  node.appendChild(textnode);
  selected.appendChild(node);
  selectedArray.push(selectedText.toString());
});

document.addEventListener("mousedown", (e) => {
  if (getComputedStyle(btnAdd).display === "block" && e.target.id != "btnAdd") {
    btnAdd.style.display = "none";
    window.getSelection().empty();
  }
});

btnClear.addEventListener("click", () => {
  selectedArray = [];
  while (selected.lastElementChild) {
    selected.removeChild(selected.lastElementChild);
  }
});

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

btnDownload.addEventListener("click", () => {
  download(JSON.stringify(selectedArray), "output.json", "text/plain");
});
