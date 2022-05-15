import { FC, useState, useEffect } from 'react';
import Countdown, { zeroPad, calcTimeDelta } from 'react-countdown';
import axios from 'axios';

import { dateFormat } from 'utils';
import { MainLayout } from 'layouts';
import { HomeInfoItem } from 'components';
import { ILaunch, IRocket, ILaunchpad, ITimer } from 'types';

import './Home.css';

export const Home: FC = () => {
  const [launch, setLaunch] = useState({} as ILaunch);
  const [rocket, setRocket] = useState({} as IRocket);
  const [launchpad, setLaunchpad] = useState({} as ILaunchpad);
  const [timeDelta, setTimeDelta] = useState({} as ITimer);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getNextLaunch = async () => {
      try {
        const launch = await axios.get(`https://api.spacexdata.com/v4/launches/next`);
        setLaunch(launch.data);
        setTimeDelta(
          calcTimeDelta(new Date(launch.data.date_utc).getTime(), { now: () => Date.now() }),
        );

        const rocketID = launch.data.rocket;
        const rocket = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
        setRocket(rocket.data);

        const launchpadID = launch.data.launchpad;
        const launchpad = await axios.get(
          `https://api.spacexdata.com/v4/launchpads/${launchpadID}`,
        );
        setLaunchpad(launchpad.data);
      } catch (error) {
        setError(error);
      }
    };
    getNextLaunch();
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }: ITimer) => {
    if (completed) {
      return <div className="timer-message">Launch is done</div>;
    } else {
      return (
        <>
          <div className="timer">
            <span>
              {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
          </div>
          <div className="pattern">days : hours : minutes : seconds</div>
        </>
      );
    }
  };

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
        {timeDelta.total ? (
          <Countdown date={Date.now() + timeDelta.total} renderer={renderer} />
        ) : (
          <div className="timer">00:00:00:00</div>
        )}
        <div className="info">
          <HomeInfoItem title="Mission" description={launch.name} />
          <HomeInfoItem title="Rocket" description={rocket.name} />
          <HomeInfoItem title="Target Time" description={dateFormat(launch.date_unix)} />
          <HomeInfoItem title="Launch Site" description={launchpad.name} />
        </div>
      </div>
    </MainLayout>
  );
};
