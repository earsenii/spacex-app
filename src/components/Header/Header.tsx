import React, { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { ILink } from 'types/ILink';

import './Header.css';

interface IProps {
  /**
   * @description Пункты меню
   */
  linkRoutes: ILink[];
}

/**
 * @description Компонент для отображения header
 * @component
 */
export const Header: FC<IProps> = ({ linkRoutes }) => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <h1 className="header__title">SpaceX Launches Info</h1>
      <nav className="header__navigation">
        {linkRoutes.map((link) => (
          <Link
            key={link.id}
            className={link.url === pathname ? 'nav-item nav-link active' : 'nav-item nav-link'}
            to={link.url}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};
