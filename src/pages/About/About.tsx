import React, { FC } from 'react';

import { MainLayout } from 'layouts';

import './About.css';

export const About: FC = () => {
  return (
    <MainLayout>
      <div className="about">
        This is a training project completed as part of a course for frontend developers.
      </div>
    </MainLayout>
  );
};
