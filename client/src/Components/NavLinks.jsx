import { NavLink } from "react-router-dom";
import { useDashbardContext } from "../pages/DashboardLayout";
import links from "../utils/links";

const NavLinks = ({isBigSidebar}) => {
    const {toggleSidebar, user} = useDashbardContext();
  return (
    <div className="nav-links">
        {links.map((link)=>{
            const {text, path, icon} = link
            const {role} = user;
            if(path === 'admin' && role !== 'admin') return;
            return <NavLink to={path} key={text} className='nav-link' onClick={!isBigSidebar ? toggleSidebar : null} end>
                <span className="icon">{icon}</span>
                {text}
            </NavLink>
        })}
    </div>
  )
}
export default NavLinks