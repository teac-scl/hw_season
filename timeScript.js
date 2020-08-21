(function () {
  const appState = {
    seasonData: [
      {
        id: 1,
        backgroundName: "1січень.jpg",
        seasonName: "січень",
      },
      {
        id: 2,
        backgroundName: "2лютий.jpg",
        seasonName: "лютий",
      },
      {
        id: 3,
        backgroundName: "3березень.jpg",
        seasonName: "березень",
      },
      {
        id: 4,
        backgroundName: "4квітень.jpg",
        seasonName: "квітень",
      },
      {
        id: 5,
        backgroundName: "5травень.jpg",
        seasonName: "травень",
      },
      {
        id: 6,
        backgroundName: "6червень.jpg",
        seasonName: "червень",
      },
      {
        id: 7,
        backgroundName: "7липень.jpg",
        seasonName: "липень",
      },
      {
        id: 8,
        backgroundName: "8серпень.jpg",
        seasonName: "серпень",
      },
      {
        id: 9,
        backgroundName: "9вересень.jpg",
        seasonName: "вересень",
      },
      {
        id: 10,
        backgroundName: "10жовтень.jpg",
        seasonName: "жовтень",
      },
      {
        id: 11,
        backgroundName: "11листопад.jpg",
        seasonName: "листопад",
      },
      {
        id: 12,
        backgroundName: "12грудень.jpg",
        seasonName: "грудень",
      },
    ],
    selectors: {
      timeClock: document.querySelector("#time-clock"),
      natureBackground: document.querySelectorAll(".nature-background"),
    },
    timeValue: {
      currentObject: null,
      year: 0,
      month: 0,
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    appEngine: setInterval(function () {
      clockRun(appState);
      // console.log(1)
    }, 1000),
  };
  clockRun(appState);
})();

function clockRun(appMainState) {
  //appMainState.appEngine()

  getAppTime(appMainState);
  showTime(appMainState);
  loadPictureDueToTime(appMainState);
}

function getAppTime(appMainState) {
  const date = new Date();
  var timeValue = appMainState.timeValue;

  timeValue.year = date.getFullYear();
  timeValue.month = date.getMonth() + 1;
  timeValue.day = date.getDate();
  timeValue.hours = date.getHours();
  timeValue.minutes = date.getMinutes();
  timeValue.seconds = date.getSeconds();

  timeValue.currentObject = findObjectPerMonth(appMainState, timeValue.month);
}

function findObjectPerMonth(appMainState, month) {
  const seasonData = appMainState.seasonData;
  return seasonData.find((date) => date.id == month);
}

function loadPictureDueToTime(appMainState) {
  const natureBackground = appMainState.selectors.natureBackground;
  const timeValue = appMainState.timeValue;
  /*Імена файлів з нічним зображенням - n8серпень.jpg,  ранок - m8серпень.jpg, вечір - e8серпень.jpg*/
  for (let selectorBackground of natureBackground) {
    console.log(selectorBackground);
    if (timeValue.hours < 12 && timeValue.hours >= 4) {
      selectorBackground.style = `background-image: url(./img/m${timeValue.currentObject.backgroundName});`;
    } else if (timeValue.hours < 16 && timeValue.hours >= 12) {
      selectorBackground.style = `background-image: url(./img/${timeValue.currentObject.backgroundName});`;
    } else if (timeValue.hours < 23 && timeValue.hours >= 16) {
      selectorBackground.style = `background-image: url(./img/e${timeValue.currentObject.backgroundName});`;
    } else
      selectorBackground.style = `background-image: url(./img/n${timeValue.currentObject.backgroundName});`;
  }
}

function showTime(appMainState) {
  const timeValue = appMainState.timeValue;
  const timeDisplayArea = appMainState.selectors.timeClock;
  const timeHours =
    timeValue.hours < 10 ? "0" + `${timeValue.hours}` : timeValue.hours;
  const timeSeconds =
    timeValue.seconds < 10 ? "0" + `${timeValue.seconds}` : timeValue.seconds;

  const timeMinutes =
    timeValue.minutes < 10 ? "0" + `${timeValue.minutes}` : timeValue.minutes;

  const tiemrText = `
        <h1>${timeValue.currentObject.seasonName}</h1>
        <p>${timeValue.year}/${timeValue.month}/${timeValue.day}</p>
        <p>${timeHours} ${timeValue.seconds % 2 === 0 ? ":" : "&nbsp;"} ${
    timeMinutes
    /*timeValue.minutes*/
  }  
        ${timeValue.seconds % 2 === 0 ? ":" : "&nbsp;"}  ${timeSeconds}</p>
    `;
  timeDisplayArea.innerHTML = tiemrText;
  //ранок
  if (timeValue.hours < 12 && timeValue.hours >= 4) {
    console.log(timeValue.hours < 12 && timeValue.hours >= 4);
    timeDisplayArea.classList.add("time-clock-m");
    if (timeDisplayArea.classList.contains("time-clock-n"))
      timeDisplayArea.classList.remove("time-clock-n");
    if (timeDisplayArea.classList.contains("time-clock-d"))
      timeDisplayArea.classList.remove("time-clock-d");
    if (timeDisplayArea.classList.contains("time-clock-e"))
      timeDisplayArea.classList.remove("time-clock-e");
  } //день
  else if (timeValue.hours < 16 && timeValue.hours >= 12) {
    timeDisplayArea.classList.add("time-clock-d");
    if (timeDisplayArea.classList.contains("time-clock-n"))
      timeDisplayArea.classList.remove("time-clock-n");
    if (timeDisplayArea.classList.contains("time-clock-m"))
      timeDisplayArea.classList.remove("time-clock-m");
    if (timeDisplayArea.classList.contains("time-clock-e"))
      timeDisplayArea.classList.remove("time-clock-e");
  } //вечір
  else if (timeValue.hours < 23 && timeValue.hours >= 16) {
    timeDisplayArea.classList.add("time-clock-e");
    if (timeDisplayArea.classList.contains("time-clock-n"))
      timeDisplayArea.classList.remove("time-clock-n");
    if (timeDisplayArea.classList.contains("time-clock-m"))
      timeDisplayArea.classList.remove("time-clock-m");
    if (timeDisplayArea.classList.contains("time-clock-d"))
      timeDisplayArea.classList.remove("time-clock-d");
  } //ніч
  else if (timeValue.hours < 3 && timeValue.hours >= 23) {
    timeDisplayArea.classList.add("time-clock-n");
    if (timeDisplayArea.classList.contains("time-clock-d"))
      timeDisplayArea.classList.remove("time-clock-d");
    if (timeDisplayArea.classList.contains("time-clock-m"))
      timeDisplayArea.classList.remove("time-clock-m");
    if (timeDisplayArea.classList.contains("time-clock-e"))
      timeDisplayArea.classList.remove("time-clock-e");
  }
}
