import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar"
import { useDashbardContext } from "../pages/DashboardLayout"
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
    const {showSidebar, toggleSidebar} = useDashbardContext();
    console.log(showSidebar);
    console.log("sidebar-container show-sidebar");
  return (
    <Wrapper>
        <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
            <div className="content">
                <button type="button" className="close-btn" onClick={toggleSidebar}>
                    <FaTimes/>
                </button>
                <header>
                    <Logo/>
                </header>
                <NavLinks/>
            </div>
        </div>
    </Wrapper>
  )
}
export default SmallSidebar
