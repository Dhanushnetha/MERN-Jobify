import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashbardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
    const {isDarkTheme, toggleDarkTheme} = useDashbardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme ? <BsFillSunFill className='toggle-icon'/> : <BsFillMoonFill/>}
    </Wrapper>
  )
}
export default ThemeToggle