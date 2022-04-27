import { sendRequest } from './sendRequest.js';
import { toLocaleDate } from './toLocaleDate.js';
import { months } from './months.js';

const $itemsSection = document.querySelector('.timeline-items');

const url = 'https://api.spacexdata.com/v4/launches';

const getAllLaunches = sendRequest('GET', url);

getAllLaunches.then((data) => {
  data.forEach((item) => {
    const date = new Date(item.date_utc);
    const year = date.getFullYear();
    const monthId = date.getMonth();
    const monthName = months[monthId];
    const localeDate = toLocaleDate(date);

    let success = '';
    if (item.upcoming) {
      success = 'Upcoming';
    } else if (item.success) {
      success = 'Successful';
    } else {
      success = 'Failed';
    }

    const template = `<div class="timeline-item">
    <div class="timeline-item__dot"></div>
    <div class="timeline-item__date">${monthName} ${year}</div>
    <div class="timeline-item__content">
      <h3>${item.name}</h3>
      <p>${localeDate} GMT+3</p>
      <p>${success}</p>
    </div>
  </div>`;
    $itemsSection.insertAdjacentHTML('afterbegin', template);
  });
});
