import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ALL_ROUTES, IRoute } from './AllRoutes';

function getItem(item: IRoute, index: number) {
  return (
    <Route key={index} index={item.index} path={item.path} element={item.element}>
      {Boolean(item.children)?item.children?.map((item2, idx2) => getItem(item2, idx2)):null}
    </Route>
  );
}

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {ALL_ROUTES.map((item, idx) => (getItem(item, idx)))}
      </Routes>
    </BrowserRouter>
  );
}
