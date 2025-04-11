import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Jobs from "./pages/Jobs/Jobs";
import AddJobs from "./pages/AddJobs/AddJobs";
import NavBar from "./pages/NavBar/NavBar";
import RootLayout from "./layout/RootLayout";
import Edit from "./pages/Edit/Edit";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Jobs />} />
        <Route path="/add" element={<AddJobs />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
