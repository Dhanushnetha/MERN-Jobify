import { useQuery } from "@tanstack/react-query"
import { Form, redirect, useLoaderData, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect, SubmitBtn } from "../Components"
import customFetch from "../utils/customFetch"

const singleJobQuery = (id)=>{
  return {
    queryKey: ['job', id],
    queryFn: async()=>{
      const {data} = await customFetch.get(`/jobs/${id}`);
      return data;
    }
  }
}

export const loader =(queryClient)=> async({params})=>{
try {
  await queryClient.ensureQueryData(singleJobQuery(params.id))
  console.log(params.id);
  return params.id;
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return redirect('/dashboard/all-jobs');
}
}
export const action =(queryClient)=> async({request, params})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    queryClient.invalidateQueries(['jobs'])
    queryClient.invalidateQueries(['stats'])
    toast.success('Job edited successfully')
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}
const EditJob = () => {
  // const params = useParams();
  // console.log(params);
  const id = useLoaderData();
  const {data:{job}} = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow type='text' name='jobLocation' labelText='Job Location' defaultValue={job.jobLocation} />
          <FormRowSelect name='jobStatus' labelText='job status' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name='jobType' labelText='job type' defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditJob