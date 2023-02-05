import './App.css';
import Map from './Components/Map';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './Components/About';
import Contact from './Components/Contact';
import AboutButton from "./Components/AboutButton";


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Map /><AboutButton />
    </>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

function App() {
  return  <RouterProvider router={router} />;
}

export default App;
