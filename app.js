const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const btnAdd = document.getElementById("btnAdd");
const selected = document.querySelector(".selected");
const btnClear = document.getElementById("btnClear");
const btnDownload = document.getElementById("btnDownload");
const btnSend = document.getElementById("btnSend");
let rowid = document.getElementById("number");
const btnRow = document.getElementById("btnRow");
let data;
let row;



btnUpload.addEventListener("click", () => {
    Papa.parse(document.getElementById('inpFile').files[0],{
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            data = results;
            console.log(data)
        }
    });
});
 
btnRow.addEventListener("click", () => {
    row = rowid.value;
    resultText.value = data.data[row].text
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
  download(JSON.stringify(selectedArray), `${row}.json`, "text/plain");
});
