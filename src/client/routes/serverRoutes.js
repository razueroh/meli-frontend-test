import App from '../containers/App';

const routes = [
  {
    path: '/',
    component: App,
    exact: true,
  },
  {
    path: '/items',
    component: App,
    exact: true,
  },
  {
    path: '/items/:id',
    component: App,
    exact: true,
  },
];

export default routes;
