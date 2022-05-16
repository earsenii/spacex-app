import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { dateFormat, dateFormatMini } from 'utils';
import { IItem } from 'types/item';

import './TimelineItem.css';

export const TimelineItem: FC<IItem> = ({ id, name, date_unix, success, upcoming }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item__dot"></div>
      <div className="timeline-item__date">{dateFormatMini(date_unix)}</div>
      <div className="timeline-item__content">
        <Link to={`/launch/${id}`} className="timeline-item__content__link">
          <h3>{name}</h3>
        </Link>
        <p>{dateFormat(date_unix)}</p>
        <p>{upcoming ? 'Upcoming' : success ? 'Successful' : 'Failed'}</p>
      </div>
    </div>
  );
};
