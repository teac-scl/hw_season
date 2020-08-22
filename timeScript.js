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
   if (timeValue.hours < 12 && timeValue.hours >= 4) {
    addStyle(
      appMainState,
      "timeClock",
      "time-clock-m",
      "time-clock-d",
      "time-clock-e",
      "time-clock-n"
    );
  } else if (timeValue.hours < 16 && timeValue.hours >= 12) {
    addStyle(
      appMainState,
      "timeClock",
      "time-clock-d",
      "time-clock-n",
      "time-clock-m",
      "time-clock-e"
    );
  } else if (timeValue.hours < 23 && timeValue.hours >= 16) {
    addStyle(
      appMainState,
      "timeClock",
      "time-clock-e",
      "time-clock-d",
      "time-clock-m",
      "time-clock-n"
    );
  } else if (timeValue.hours < 3 && timeValue.hours >= 23) {
    addStyle(
      appMainState,
      "timeClock",
      "time-clock-n",
      "time-clock-d",
      "time-clock-e",
      "time-clock-m"
    );
  }
}
function addStyle(
  appMainState,
  changeSeltctor,
  newStyle,
  oldStyle1,
  oldStyle2,
  oldStyle3
) {
  //const timeDisplayArea = appMainState.selectors.timeClock;
  const timeDisplayArea = appMainState.selectors[`${changeSeltctor}`];
  console.log(timeDisplayArea);
  timeDisplayArea.classList.add(newStyle);
  if (timeDisplayArea.classList.contains(oldStyle1))
    timeDisplayArea.classList.remove(oldStyle1);
  if (timeDisplayArea.classList.contains(oldStyle2))
    timeDisplayArea.classList.remove(oldStyle2);
  if (timeDisplayArea.classList.contains(oldStyle3))
    timeDisplayArea.classList.remove(oldStyle3);
}

