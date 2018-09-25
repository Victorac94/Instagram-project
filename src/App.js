import { h, render } from 'preact';
import { Router } from 'preact-router';

import Home from './routes/Home/Home';
import Profile from './components/containers/Profile/Profile';
import Post from './components/containers/Post/Post';

const app = (props) => (
  <Router>
    <Home path="/" />
    <Profile path="/:accountName" />
    <Post path="/:accountName/:postId" />
  </Router>
);

export default app;
