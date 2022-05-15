import React, { FC } from 'react';

import { IInfoItem } from 'types/infoItem';

import './HomeInfoItem.css';

export const HomeInfoItem: FC<IInfoItem> = ({ title, description }) => {
  return (
    <div className="info-item">
      <div className="info-item__title">{title}</div>
      <div className="info-item__description">{description}</div>
    </div>
  );
};
