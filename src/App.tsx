import React, { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { About, All, Failed, Home, Successful, LaunchFull } from 'pages';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/launch/:id" element={<LaunchFull />} />
      <Route path="/" element={<Home />} />
      <Route path="/all" element={<All />} />
      <Route path="/successful" element={<Successful />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};
