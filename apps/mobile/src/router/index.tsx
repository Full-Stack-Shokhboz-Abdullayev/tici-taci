import { FC, ReactNode } from 'react';
import {
  Location,
  NativeRouter as Router,
  Route,
  Routes
} from 'react-router-native';
import Modal from '../components/Modal';
import { useEmptyGame, useLocationChange } from '../hooks';

import GamePage from '../pages/Game.page';
import HomePage from '../pages/Home.page';

const RouteChangeDetector: (props: {
  children?: ReactNode;
  onChange: (current: Location) => void;
}) => any = ({ children, onChange }) => {
  useLocationChange(onChange);
  return children;
};

const RouterContext: FC<{ navbar?: JSX.Element; footer?: JSX.Element }> = ({
  navbar,
  footer
}) => {
  const emptyGame = useEmptyGame('/game');
  return (
    <Router>
      <Modal />
      {navbar}
      <RouteChangeDetector onChange={emptyGame}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:code" element={<GamePage />} />
        </Routes>
      </RouteChangeDetector>
      {footer}
    </Router>
  );
};

export default RouterContext;
