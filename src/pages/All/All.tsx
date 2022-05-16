import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import { MainLayout, TimelineLayout } from 'layouts';
import { TimelineItem } from 'components';

export const All: FC = () => {
  const [launches, setLaunches] = useState([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getAllLaunches = async () => {
      try {
        const launches = await axios.get(`https://api.spacexdata.com/v4/launches`);
        setLaunches(launches.data);
      } catch (error) {
        setError(error);
      }
    };
    getAllLaunches();
  }, []);

  if (error) {
    return (
      <MainLayout>
        <div>Error</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TimelineLayout>
        {launches
          .map(({ id, name, date_unix, success, upcoming }) => (
            <TimelineItem
              key={id}
              id={id}
              name={name}
              date_unix={date_unix}
              success={success}
              upcoming={upcoming}
            />
          ))
          .reverse()}
      </TimelineLayout>
    </MainLayout>
  );
};
