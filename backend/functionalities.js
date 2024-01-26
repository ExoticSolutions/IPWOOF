import REQUESTS from "./requests.js";
const getDataBtn = document.querySelector(".ip-data-btn");
const outputElement = document.querySelector(".data-output");
getDataBtn.addEventListener("click", () => {
  console.log("clicked");
  getIPData();
});

function getIPData() {
  console.log("getting IP data");
  runCall();
}

function runCall() {
  const endpoint = REQUESTS.getIPData;
  console.time("Call completed in:");
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("success");
      console.timeEnd("Call completed in:");
      localStorage.setItem("data-returned", JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
    });

  renderElement();
}

function renderElement() {
  let outputHTML = "";
  const dataReturned = JSON.parse(localStorage.getItem("data-returned"));
  console.log(dataReturned);

  outputHTML = `
  <h1 class="text-center underline mb-5 output-title">Your data:</h1>
  <table class="table-auto ms-auto me-auto mb-10">
   <thead>
    <tr class="border data-table">
     <th class="border border-stone-600">Country</th>
     <th class="border border-stone-600">City</th>
     <th class="border border-stone-600"> IP address</th>
     <th class="border border-stone-600">Latitude</th>
     <th class="border border-stone-600">Longitude</th>
     
    </tr>
   </thead>
   <tbody class="border">
    <tr class="">
     <td class="border border-stone-600">${dataReturned.country_name} ${dataReturned.emoji_flag}</td>
     <td class="border border-stone-600">${dataReturned.city}</td>

     <td class="border border-stone-600">${dataReturned.ip}</td>
     <td class="border border-stone-600">${dataReturned.latitude}</td>
     <td class="border border-stone-600">${dataReturned.longitude}</td>
    </tr>
   </tbody>
  </table>`;
  outputElement.innerHTML = outputHTML;
}
