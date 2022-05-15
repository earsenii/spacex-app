import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MainLayout } from 'layouts';
import { ILaunch, IRocket } from 'types';
import { dateFormat } from 'utils';

interface ILaunchLinks {
  article?: string;
  webcast?: string;
  wikipedia?: string;
  patch?: object;
}

interface IPatch {
  small?: string;
  large?: string;
}

export const LaunchFull: FC = () => {
  const [launch, setLaunch] = useState({} as ILaunch);
  const [rocket, setRocket] = useState({} as IRocket);
  const [links, setLinks] = useState({} as ILaunchLinks);
  const [patch, setPatch] = useState({} as IPatch);
  const [error, setError] = useState<unknown>();
  const params = useParams();
  const { id } = params;
  const { date_unix, flight_number, name, success, upcoming } = launch;
  const { small } = patch;
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
      <div>
        {patch.small ? <img src={small} alt="patch" /> : <div>No patch yet</div>}
        <div>Mission: {name}</div>
        <div>Rocket: {rocket.name}</div>
        <div>Flight number: {flight_number}</div>
        <div>Launch Date: {dateFormat(date_unix)}</div>
        <div>Success: {upcoming ? 'Upcoming' : success ? 'Successful' : 'Failed'}</div>
        {article ? <div>Article: {article}</div> : <div>Article: -</div>}
        {webcast ? <div>Youtube: {webcast}</div> : <div>Youtube: -</div>}
        {wikipedia ? <div>Wikipedia: {wikipedia}</div> : <div>Wikipedia: -</div>}
      </div>
    </MainLayout>
  );
};
