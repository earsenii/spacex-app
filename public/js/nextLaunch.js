import { sendRequest } from './sendRequest.js';
import { toLocaleDate } from './toLocaleDate.js';

const $mission = document.querySelector('#mission');
const $rocket = document.querySelector('#rocket');
const $targetTime = document.querySelector('#targetTime');
const $launchSite = document.querySelector('#launchSite');
const $days = document.querySelector('#days');
const $hours = document.querySelector('#hours');
const $minutes = document.querySelector('#minutes');
const $seconds = document.querySelector('#seconds');

let launchDate = new Date().getTime();
const url = 'https://api.spacexdata.com/v4/launches/next';

/**
 * Получение ближайшего запуска
 */
const getNextLaunch = sendRequest('GET', url);

getNextLaunch.then((launch) => {
  $mission.textContent = launch.name;
  launchDate = toLocaleDate(new Date(launch.date_utc));
  $targetTime.textContent = `${launchDate} GMT+3`;
});

/**
 * Получение названия ракеты в ближайшем запуске
 * @returns {object} Результат запроса в JSON
 */
const getNextLaunchRocket = async () => {
  try {
    const nextLaunchResponse = await fetch(`https://api.spacexdata.com/v4/launches/next`);
    const launch = await nextLaunchResponse.json();

    const rocketId = launch.rocket;
    const rocketResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`);

    return rocketResponse.json();
  } catch (err) {
    console.error('Error', err);
  }
};

getNextLaunchRocket().then((rocket) => {
  $rocket.textContent = rocket.name;
});

/**
 * Получение названия площадки запуска в ближайшем запуске
 * @returns {object} Результат запроса в JSON
 */
const getNextLaunchLaunchpad = async () => {
  try {
    const nextLaunchResponse = await fetch(`https://api.spacexdata.com/v4/launches/next`);
    const launch = await nextLaunchResponse.json();

    const launchpadId = launch.launchpad;
    const launchpadResponse = await fetch(
      `https://api.spacexdata.com/v4/launchpads/${launchpadId}`,
    );

    return launchpadResponse.json();
  } catch (err) {
    console.error('Error', err);
  }
};

getNextLaunchLaunchpad().then((launchpad) => {
  $launchSite.textContent = launchpad.name;
});

/**
 * Отсчет до ближайшего запуска
 */
function updateCountdown() {
  const currentTime = new Date().getTime();
  const distance = new Date(launchDate).getTime() - currentTime;
  const days = Math.floor(distance / 1000 / 60 / 60 / 24);
  const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(distance / 1000 / 60) % 60;
  let seconds = Math.floor(distance / 1000) % 60;

  if (seconds < 0 && minutes < -1) {
    return;
  }

  $days.textContent = days < 10 ? '0' + days : days;
  $hours.textContent = hours < 10 ? '0' + hours : hours;
  $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
  $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
