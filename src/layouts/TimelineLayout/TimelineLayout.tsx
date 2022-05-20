import React, { FC, ReactNode } from 'react';

import './TimelineLayout.css';

interface IProps {
  children: ReactNode;
}

/**
 * @description Компонент для отображения детальной информации о запусках на временной линии
 * @component
 */
export const TimelineLayout: FC<IProps> = ({ children }: IProps) => {
  return (
    <section className="timeline-section">
      <div className="timeline-items">{children}</div>
    </section>
  );
};
