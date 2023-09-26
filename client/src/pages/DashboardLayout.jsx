import { useQuery } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import { toast } from "react-toastify"
import { checkDefaultTheme } from "../App"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../Components"
import customFetch from "../utils/customFetch"

const DashboardContext = createContext();

const userQuery = {
  queryKey: ['user'],
  queryFn: async()=>{
    const {data} = await customFetch.get('/users/current-user')
    return data;
  }
}

export const loader =(queryClient)=> async()=>{
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    toast.error('Please Login...');
    return redirect('/');
  }
}

const DashboardLayout = ({isDarkThemeEnabled, queryClient}) => {
  const {user} = useQuery(userQuery).data;
  // const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading'; 
  //temp
  // const user = {name: 'john'}
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = ()=>{
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('dark-theme', newDarkTheme);
  }
  const toggleSidebar =()=>{
    setShowSidebar(!showSidebar);
  }
  const logoutUser = async()=>{
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
  }

  customFetch.interceptors.response.use((response)=>{
    return response
  }, (error)=>{
    if(error?.response?.status === 401){
      setIsAuthError(true);
    }
    return Promise.reject(error);
  })

  useEffect(()=>{
    if(!isAuthError) return;
    logoutUser();
  },[isAuthError])

  return (
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            {isPageLoading ? <Loading/>: <Outlet context={{user}} />}
          </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashbardContext =()=> useContext(DashboardContext);

export default DashboardLayout