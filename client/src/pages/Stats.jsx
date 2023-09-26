import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "react-router-dom"
import { ChartsContainer, StatsContainer } from "../Components"
import customFetch from "../utils/customFetch"


const statsQuery = {
  queryKey: ['stats'],
    queryFn:async ()=> {
      const response = await customFetch('/jobs/stats')
      return response.data;
    }
}

export const loader =(queryClient)=>async()=>{
    const data = await queryClient.ensureQueryData(statsQuery);
    return data;
}

const Stats = () => {
  //const {defaultStats, monthlyApplications} = useLoaderData();
  const { data } = useQuery(statsQuery);
  // if(isLoading) return <h4>Loading...</h4>;
  // if(isError) return <h4>Error...</h4>;
  
  const {defaultStats, monthlyApplications} = data;
  return (
    <>
    <StatsContainer defaultStats={defaultStats}/>
    {
      monthlyApplications?.length > 1 && <ChartsContainer data={monthlyApplications}/>
    }
    </>
  )
}
export default Stats