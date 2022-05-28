import React, { FC } from 'react';

import { IInfoItem } from 'types/IInfoItem';

import './HomeInfoItem.css';

/**
 * @description Компонент для отображения информации о запуске на главной странице
 * @component
 */
export const HomeInfoItem: FC<IInfoItem> = ({ title, description }) => {
  return (
    <div className="info-item">
      <div className="info-item__title">{title}</div>
      <div className="info-item__description">{description}</div>
    </div>
  );
};
