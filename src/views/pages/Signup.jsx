import { useState } from 'react'
import '../style/sign.css';
// import { submitData } from './SignUpHelper.js';
import { Link, useNavigate } from 'react-router-dom';
import { signUpHandle } from '../../models/signup.model';
import Page from '../components/Page';
import { getDispatch } from '../../App';
import { updateLoader } from '../../controllers/states/slices/loadingslice';
// import { showMessage, changeState, toastMessage } from '../App.jsx';
const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleForm = (e)=>{
    setForm(pre=>({
      ...pre,
      [e.target.name]: e.target.value
    }));
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    getDispatch()(updateLoader(true));
    const val = await signUpHandle(form);
    getDispatch()(updateLoader(false));
    if(val){
      navigate('/');
      setForm({
        username: '',
        email: '',
        password: ''
      });
    }
  }


  return (
    <Page>
        <form onSubmit={onSubmit} className="w-full flex justify-center items-center flex-col gap-[50px]">
        <div className="mt-[30px] t-[30px] heading-h1">Welcome</div>
        <div className="sign-up page-load-animation question-card-shadow">
            <div className="w-full h-4/5 flex justify-center items-center flex-col gap-[50px]">
            <div className="heading-h2">Sign Up</div>

            <div className="input-container">
                <span className="block font-[Inter]">username</span>
                <input className='input-style' type="text" name='username' onChange={handleForm} value={form.username}/>
            </div>

            <div className="input-container">
                <span className="block font-[Inter]">email</span>
                <input className='input-style' type="email" name='email' onChange={handleForm} value={form.email}/>
            </div>

            <div className="input-container">
                <span className="block font-{Inter]">password</span>
                <input className='input-style' type="password" name='password' onChange={handleForm} value={form.password}/>
            </div>
            <button className="submit-button" onClick={()=>{
              // const serverResponse = submitData(form, setToast)
              // if(!serverResponse) return;
              // setForm({email:'',password:''});
            }}>Sign Up</button>

            </div>
            <div className="other-options">
              <div className="switch-login">Don't Have Account? <Link to='/signin'>signin</Link></div>
            </div>
        </div>
    </form>
    </Page>
  )
}


export default Signup;