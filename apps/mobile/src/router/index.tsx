import { FC } from 'react';
import { NativeRouter as Router, Route, Routes } from 'react-router-native';
import Modal from '../components/Modal';

import GamePage from '../pages/Game.page';
import HomePage from '../pages/Home.page';

const RouterContext: FC<{ navbar?: JSX.Element; footer?: JSX.Element }> = ({
  navbar,
  footer
}) => {
  return (
    <Router>
      <Modal />

      {/* <Modal></Modal> */}
      {navbar}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:code" element={<GamePage />} />
      </Routes>
      {footer}
    </Router>
  );
};

export default RouterContext;
