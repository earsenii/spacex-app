import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import { MainLayout, TimelineLayout } from 'layouts';
import { TimelineItem } from 'components';

/**
 * @description Страница с информацией о неудачных запусках
 */
export const Failed: FC = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const getFailedLaunches = async () => {
      const launches = await axios.post(`https://api.spacexdata.com/v4/launches/query`, {
        query: {
          success: false,
        },
        options: {
          pagination: false,
        },
      });
      setLaunches(launches.data.docs);
    };
    getFailedLaunches();
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
