import { useState } from 'react'
import '../style/sign.css';
// import { submitData } from './SignUpHelper.js';
import { Link, useNavigate } from 'react-router-dom';
import { signUpHandle } from '../../models/signup.model';
import { signInHandle } from '../../models/signin.model';
import { updateLoader } from '../../controllers/states/slices/loadingslice';
import { getDispatch } from '../../App';
const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleForm = (e)=>{
    setForm(pre=>({
      ...pre,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dispatch = getDispatch(); // or useDispatch()
  
    try {
      dispatch(updateLoader(true));
  
      const success = await signInHandle(form);
      if (success) {
        navigate('/');
        setForm({ email: '', password: '' }); // reset only on success
      }
    } catch (error) {
      console.error("Login failed:", error);
      // optionally show alert here
    } finally {
      dispatch(updateLoader(false)); // always hide loader
    }
  };
  
  return (
    <form onSubmit={onSubmit} className="w-full flex justify-center items-center flex-col gap-[50px]">
        <div className="mt-[30px] t-[30px] heading-h1">Again</div>
        <div className="sign-up page-load-animation question-card-shadow">
            <div className="w-full h-4/5 flex justify-center items-center flex-col gap-[50px]">
            <div className="heading-h2">Sign In</div>
            <div className="input-container">
                <span className="block font-[Inter]">email</span>
                <input className='input-style' type="email" name='email' onChange={handleForm} value={form.email}/>
            </div>
            <div className="input-container">
                <span className="block font-{Inter]">password</span>
                <input className='input-style' type="password" name='password' onChange={handleForm} value={form.password}/>
            </div>
            <button type='submit' className="submit-button">Sign In</button>

            </div>
            <div className="other-options">
              <div className="switch-login">Don't Have Account? <Link to='/signup'>signup</Link></div>
            </div>
        </div>
    </form>
  )
}


export default Signin;