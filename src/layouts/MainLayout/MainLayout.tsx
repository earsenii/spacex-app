import React, { FC, ReactNode } from 'react';

import { linkRoutes } from 'utils';
import { Footer, Header } from 'components';

import './MainLayout.css';

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }: IProps) => {
  return (
    <div className="wrapper">
      <Header linkRoutes={linkRoutes} />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};
