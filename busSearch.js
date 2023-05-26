const urlParams = new URLSearchParams(window.location.search);
const source = urlParams.get("from");
const destination = urlParams.get("to");
const date = urlParams.get("date").split("/").join(" ");
let data = { source, destination, date };
console.log({ data });

window.addEventListener("load", fetchBusData);
function fetchBusData() {
  console.log(API_URL);
  fetch(`${API_URL}/search`, {
    method: "POST",
    body: JSON.stringify(data),
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      appendBuses(r);
    });
}
function appendBuses(data) {
  let tableBody = document.querySelector("#table-body");

  const { success, buses } = data;
  if (!success) {
    document.getElementById(
      "info"
    ).innerHTML = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">ERROR</span>No Buses Found. Change a few things up and try submitting again.
</div`;
  } else {
    for (bus of buses) {
      let tr = document.createElement("tr");
      // tr.innerText = "supp";
      tr.className +=
        " bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600";
      tr.onclick = handleBusInfoClick;
      tableBody.appendChild(tr);
      let th = document.createElement("th");
      th.className +=
        " px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
      tr.appendChild(th);
      th.innerText = bus.busid;
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      td1.classList += " px-6 py-4";
      td2.classList += " px-6 py-4";
      td3.classList += " px-6 py-4";
      td4.classList += " px-6 py-4";
      td5.classList += " px-6 py-4";
      td1.innerText = bus.busName;
      td2.innerText = bus.source;
      td3.innerText = bus.destination;
      td4.innerText = bus.date;
      td5.innerText = bus.price;
      tr.append(td1, td2, td3, td4, td5);
    }
  }
}
function handleBusInfoClick(e) {
  let tableRow = e.target.parentElement;
  let busno = tableRow.children[0].innerText;
  let busName = tableRow.children[1].innerText;
  let source = tableRow.children[2].innerText;
  let destination = tableRow.children[3].innerText;
  let date = tableRow.children[4].innerText;
  console.log({ busno, busName, source, destination, date });
}
