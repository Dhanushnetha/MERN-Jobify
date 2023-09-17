import { createContext, useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import { checkDefaultTheme } from "../App"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../Components"

const DashboardContext = createContext();

const DashboardLayout = ({isDarkThemeEnabled}) => {
  //temp
  const user = {name: 'john'}
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = ()=>{
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('dark-theme', newDarkTheme);
  }
  const toggleSidebar =()=>{
    setShowSidebar(!showSidebar);
  }
  const logoutUser = async()=>{
    console.log('log out user');
  }

  return (
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet/>
          </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashbardContext =()=> useContext(DashboardContext);

export default DashboardLayout