import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MainLayout } from 'layouts';
import { ILaunch, IRocket, ILaunchLinks, IPatch } from 'types';
import { dateFormat } from 'utils';
import { HomeInfoItem } from 'components';

import './LaunchFull.css';

/**
 * @description Страница с детальной информацией о выбранном запуске
 */
export const LaunchFull: FC = () => {
  const [launch, setLaunch] = useState({} as ILaunch);
  const [rocket, setRocket] = useState({} as IRocket);
  const [links, setLinks] = useState({} as ILaunchLinks);
  const [patch, setPatch] = useState({} as IPatch);
  const [error, setError] = useState<unknown>();
  const params = useParams();
  const { id } = params;
  const { date_unix, flight_number, name, success, upcoming } = launch;
  const { article, webcast, wikipedia } = links;

  useEffect(() => {
    if (id) {
      const getLaunch = async () => {
        try {
          const launch = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`);
          setLaunch(launch.data);
          setLinks(launch.data.links);
          setPatch(launch.data.links.patch);

          const rocketID = launch.data.rocket;
          const rocket = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
          setRocket(rocket.data);
        } catch (error) {
          setError(error);
        }
      };
      getLaunch();
    }
  }, [id]);

  if (error) {
    return (
      <MainLayout>
        <div>Error</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {patch.small ? <img src={patch.small} alt="patch" /> : <div>No patch yet</div>}
      <div className="container">
        <HomeInfoItem title="Mission" description={name} />
        <HomeInfoItem title="Rocket" description={rocket.name} />
        <HomeInfoItem title="Flight number" description={flight_number} />
        <HomeInfoItem title="Launch date" description={dateFormat(date_unix)} />
        <HomeInfoItem
          title="Success"
          description={upcoming ? 'Upcoming' : success ? 'Successful' : 'Failed'}
        />

        {article ? (
          <a className="link" href={article} target="_blank" rel="noreferrer">
            <HomeInfoItem title="Article" />
          </a>
        ) : (
          <HomeInfoItem title="Article" description="-" />
        )}
        {webcast ? (
          <a className="link" href={webcast} target="_blank" rel="noreferrer">
            <HomeInfoItem title="Youtube" />
          </a>
        ) : (
          <HomeInfoItem title="Youtube" description="-" />
        )}
        {wikipedia ? (
          <a className="link" href={wikipedia} target="_blank" rel="noreferrer">
            <HomeInfoItem title="Wikipedia" />
          </a>
        ) : (
          <HomeInfoItem title="Wikipedia" description="-" />
        )}
      </div>
    </MainLayout>
  );
};
