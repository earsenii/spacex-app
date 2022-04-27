import { sendRequest } from './sendRequest.js';
import { toLocaleDate } from './toLocaleDate.js';
import { months } from './months.js';

const $itemsSection = document.querySelector('.timeline-items');

const url = 'https://api.spacexdata.com/v4/launches/query';
const body = {
  query: {
    success: false,
  },
  options: {
    pagination: false,
  },
};

/**
 * Получение неудачных запусков
 */
const getFailedLaunches = sendRequest('POST', url, body);

/**
 * Отображение информации о неудачных запусках
 */
getFailedLaunches.then((data) => {
  const { docs } = data;
  docs.forEach((item) => {
    const date = new Date(item.date_utc);
    const year = date.getFullYear();
    const monthId = date.getMonth();
    const monthName = months[monthId];
    const localeDate = toLocaleDate(date);

    const template = `<div class="timeline-item">
    <div class="timeline-item__dot"></div>
    <div class="timeline-item__date">${monthName} ${year}</div>
    <div class="timeline-item__content">
      <h3>${item.name}</h3>
      <p>${localeDate} GMT+3</p>
      <p>${item.success ? 'Successful' : 'Failed'}</p>
    </div>
  </div>`;
    $itemsSection.insertAdjacentHTML('afterbegin', template);
  });
});
