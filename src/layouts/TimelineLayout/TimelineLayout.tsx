import React, { FC, ReactNode } from 'react';

import './TimelineLayout.css';

interface IProps {
  children: ReactNode;
}

export const TimelineLayout: FC<IProps> = ({ children }: IProps) => {
  return (
    <section className="timeline-section">
      <div className="timeline-items">{children}</div>
    </section>
  );
};
