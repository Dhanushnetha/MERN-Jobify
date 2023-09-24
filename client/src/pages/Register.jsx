import { Form, Link, redirect } from "react-router-dom"
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo, SubmitBtn } from "../Components"
import customFetch from "../utils/customFetch";

export const action = async({request})=>{
  const formData = await request.formData();
  const obj = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', obj);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo/>
        <h4>Register</h4>
       <FormRow type='text' name='name' />
       <FormRow type='text' name='lastName' labelText='Last Name' />
       <FormRow type='text' name='location' />
       <FormRow type='email' name='email' />
       <FormRow type='password' name='password' />
        <SubmitBtn />
        <p>Already a member ?
          <Link to='/login' className="member-btn">Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Register