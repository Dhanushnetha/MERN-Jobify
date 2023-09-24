import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import { redirect, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/StatsContainer"
import { StatItem } from "../Components"
import customFetch from "../utils/customFetch"

export const loader = async ()=>{
  try {
    const response = await customFetch('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page')
    return redirect('/dashboard');
  }
}

const Admin = () => {
  const {users, jobs} = useLoaderData();
  return (
    <Wrapper>
      <StatItem title='current users' count={users} color='#e9b949' bcg='#fecfc7' icon={<FaSuitcaseRolling/>} />
      <StatItem title='total jobs' count={jobs} color='#647acb' bcg='#e0e8f9' icon={<FaCalendarCheck/>} />
    </Wrapper>
  )
}
export default Admin