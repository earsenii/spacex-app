import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import { MainLayout, TimelineLayout } from 'layouts';
import { TimelineItem } from 'components';

/**
 * @description Страница с информацией об удачных запусках
 */
export const Successful: FC = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const getSuccessfulLaunches = async () => {
      const launches = await axios.post(`https://api.spacexdata.com/v4/launches/query`, {
        query: {
          success: true,
        },
        options: {
          pagination: false,
        },
      });
      setLaunches(launches.data.docs);
    };
    getSuccessfulLaunches();
  }, []);

  return (
    <MainLayout>
      <TimelineLayout>
        {launches
          .map(({ id, name, date_unix, success }) => (
            <TimelineItem key={id} id={id} name={name} date_unix={date_unix} success={success} />
          ))
          .reverse()}
      </TimelineLayout>
    </MainLayout>
  );
};
