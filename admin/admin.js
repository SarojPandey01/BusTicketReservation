// const ADMIN_PASS = 123;
// let input = prompt("Enter Admin password");
// if (parseInt(input) == ADMIN_PASS) {
//   console.log("cool");
// } else {
//   window.location.href = "/";
//   console.log("not cool");
// }
document.body.style.pointerEvents = "none";
let adminPass = 123;
// let r = prompt("Enter the admin password");
if (adminPass == 123 || true) {
  document.body.style.pointerEvents = "all";

  function fetchBusData() {
    console.log(API_URL);
    fetch(`${API_URL}/getBookings`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        bookings(r);
      });
  }
  fetchBusData();
  function bookings(data) {
    let tableBody = document.querySelector("#table-body");

    const { success, bookings } = data;
    if (!bookings[0]) {
      document.getElementById(
        "info"
      ).innerHTML = `<div class="p-4 my-1  text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">ERROR.......</span>No bookings Found. Change a few things up and try submitting again.
</div`;
    } else {
      for (bus of bookings) {
        let tr = document.createElement("tr");
        tr.dataset.reservedSeats = bus.reservedSeats;
        tr.dataset.userid = bus.userid;
        tr.dataset.userName = bus.userName;
        tr.dataset.phone = bus.phone;
        tr.dataset.email = bus.email;
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
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        td1.classList += " px-6 py-4";
        td2.classList += " px-6 py-4";
        td3.classList += " px-6 py-4";
        td4.classList += " px-6 py-4";
        td5.classList += " px-6 py-4";
        td6.classList += " px-6 py-4";
        td7.classList += " px-6 py-4";
        td1.innerText = bus.userid;
        td2.innerText = bus.name;
        td3.innerText = bus.source;
        td4.innerText = bus.destination;
        td5.innerText = bus.date;
        td6.innerText = bus.time;
        td7.innerText = bus.seat;
        tr.append(td1, td2, td3, td4, td5, td6, td7);
      }
    }
  }
} else {
  window.location.href = "../index.html";
}
let infoContainer = document.querySelector("#moreInfo");
infoContainer.classList.add("hidden");
function handleBusInfoClick(e) {
  infoContainer.classList.remove("hidden");

  let tableRow = e.target.parentElement;
  // console.log(tableRow.dataset);
  let userid = tableRow.children[1].innerText;
  let busid = tableRow.children[0].innerText;
  let busName = tableRow.children[2].innerText;
  let source = tableRow.children[3].innerText;
  let destination = tableRow.children[4].innerText;
  let date = tableRow.children[5].innerText;
  let time = tableRow.children[6].innerText;
  let seat = tableRow.children[7].innerText;
  let { userName, phone, email } = tableRow.dataset;

  let infoBox = `  <div
              class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700"
            >
              <div class="flex items-center justify-between mb-4">
                <h5
                  class="text-xl font-bold leading-none text-gray-900"
                  id="info_busname"
                >
                 ${busName}
                </h5>
              </div>
              <div class="flow-root">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-
                      w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          User Name
                        </p>
                      </div>
                      <div
                        id="info_userName"
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                       ${userName}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Bus Number
                        </p>
                      </div>
                      <div
                        id="info_busno"
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${busid}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          User ID
                        </p>
                      </div>
                      <div
                        id="info_userid"
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${userid}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          From
                        </p>
                      </div>
                      <div
                        id="info_busno"
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${source}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          To
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${destination}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Date
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${date}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Time
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${time}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Seat
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${seat}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Phone
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${phone}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate text-black"
                        >
                          Email
                        </p>
                      </div>
                      <div
                        class="inline-flex items-center text-base font-semibold text-gray-900"
                      >
                        ${email}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                id='delbtn'
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-full"
                
              >
                Delete Booking
              </button>
            </div>`;
  infoContainer.innerHTML = infoBox;
  document.getElementById("delbtn").onclick = () => {
    handleDeleteReservation(e);
  };
}
async function handleDeleteReservation(e) {
  let tableRow = e.target.parentElement;

  let userid = tableRow.children[1].innerText;
  let busid = tableRow.children[0].innerText;
  // let busName = tableRow.children[1].innerText;
  // let source = tableRow.children[2].innerText;
  // let destination = tableRow.children[3].innerText;
  // let date = tableRow.children[4].innerText.split(" ").join("/");
  // let price = tableRow.children[5].innerText;
  // let time = tableRow.children[6].innerText;

  const data = {
    userid,
    busid,
  };
  console.log(data);
  let res = await fetch(`${API_URL}/deleteReservation`, {
    method: "POST",
    body: JSON.stringify(data),
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let resjson = await res.json();
  console.log(resjson);
  tableRow.classList.add("hidden");
  infoContainer.classList.add("hidden");
}
