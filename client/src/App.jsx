import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { DashboardLayout, Error, HomeLayout, Landing, Login, Register, AddJob, Stats, AllJobs, Profile, Admin } from "./pages"

export const checkDefaultTheme = ()=>{
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>
      },
      {
        path:'register',
        element: <Register/>,
      },
      {
        path:'login',
        element: <Login/>,
      },
      {
        path:'dashboard',
        element: <DashboardLayout/>,
        children: [
          {
            index: true,
            element: <AddJob/>
          },
          {
            path:'stats',
            element:<Stats/>
          },
          {
            path:'admin',
            element:<Admin/>
          },
          {
            path:'all-jobs',
            element:<AllJobs/>
          },
          {
            path:'profile',
            element:<Profile/>
          }
        ]
      },
    ]
  },
  
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
export default App