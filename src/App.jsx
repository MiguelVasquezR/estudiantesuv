import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Books from './view/Books';
import Inicio from './view/Inicio';
import Movies from './view/Movies';
import Information from './view/Information';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/information/:id',
    element: <Information />,
  },
]);

function App() {
  return <RouterProvider router={router} />
}
export default App
