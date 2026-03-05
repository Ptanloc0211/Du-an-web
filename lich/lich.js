let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".lich-dates");
const currentDate = document.querySelector(".lich-current-date");
const prevIcon = document.querySelector("#lich-prev");
const nextIcon = document.querySelector("#lich-next");

const months = [
  "Thang 1",
  "Thang 2",
  "Thang 3",
  "Thang 4",
  "Thang 5",
  "Thang 6",
  "Thang 7",
  "Thang 8",
  "Thang 9",
  "Thang 10",
  "Thang 11",
  "Thang 12",
];

let clickedDay = null;
let selectedDayElement = null;

const isHoliday = (day, month, year) => {
  const holidays = [
    { month: 0, day: 1 },
    { month: 2, day: 8 },
  ];
  return holidays.some((h) => h.month === month && h.day === day);
};

const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastDate).getDay();
  let monthlastDate = new Date(year, month, 0).getDate();

  let lit = "";

  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastDate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let isToday =
      i === date.getDate() &&
      month === date.getMonth() &&
      year === date.getFullYear()
        ? "active"
        : "";

    let highlightClass = clickedDay == i ? "highlight" : "";
    let holidayClass = isHoliday(i, month, year) ? "holiday" : "";

    lit += `<li class="${isToday} ${highlightClass} ${holidayClass}" data-day="${i}">${i}</li>`;
  }

  // ngày tháng sau
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  currentDate.innerText = `${months[month]} ${year}`;
  day.innerHTML = lit;

  addClickListenersToDays();
};

function addClickListenersToDays() {
  const allDays = day.querySelectorAll("li:not(.inactive)");

  allDays.forEach((li) => {
    li.addEventListener("click", () => {
      if (selectedDayElement) {
        selectedDayElement.classList.remove("highlight");
      }

      li.classList.add("highlight");
      selectedDayElement = li;
      clickedDay = li.getAttribute("data-day");

      console.log("Clicked day:", clickedDay);
    });
  });
}

prevIcon.addEventListener("click", () => {
  month--;

  if (month < 0) {
    month = 11;
    year--;
  }

  manipulate();
});

nextIcon.addEventListener("click", () => {
  month++;

  if (month > 11) {
    month = 0;
    year++;
  }

  manipulate();
});

manipulate();
