"use strict";
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat");
// console.log(seats);
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
renderData();
// update total and count
function updateData() {
  const a = document.querySelectorAll(".container .selected");
  count.innerHTML = a.length;
  total.innerHTML = a.length * ticketPrice;
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateData();
});
seats.forEach((containt) => {
  containt.addEventListener("click", function (e) {
    if (!e.target.classList.contains("occupied")) {
      const sect = document.getElementById("movie");
      const move = sect.options[sect.selectedIndex].text;
      e.target.classList.toggle("selected");
      e.target.setAttribute("movie", move);
      updateData();
    }
  });
});

const btn = document
  .querySelector(".btn")
  .addEventListener("click", function () {
    let localData = localStorage.getItem("Data");
    localData = JSON.parse(localData);
    let empList = [];
    const selected1 = document.querySelectorAll(".row .selected");
    selected1.forEach((i) => {
      let id = i.id;
      let movie = i.getAttribute("movie");
      empList.push({ id, movie });
    });
    if (localData === null) {
      localStorage.setItem("Data", JSON.stringify(empList));
    } else {
      localStorage.setItem("Data", JSON.stringify([...localData, ...empList]));
    }
    window.location.reload();
  });

function renderData() {
  let localData = localStorage.getItem("Data");

  localData = JSON.parse(localData);
  if (localData) {
    localData.forEach((i) => {
      document.getElementById(i.id).classList.add("occupied");
      document.getElementById(i.id).title = i.movie;
    });
  }
}
