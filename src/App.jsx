import { lazy, Suspense, useState } from 'react'
import './App.css'
import SideBar from './views/pages/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './views/pages/HomePage';
import NavBar from './views/pages/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from './controllers/states/slices/sidebarslice';
import Signup from './views/pages/Signup';
import Signin from './views/pages/Signin';
import QuestionPage from './views/pages/QuestionPage';
import AskQuestion from './views/pages/AskQuestion';
import Alert from './views/components/Alert';
import LoadingPage from './views/pages/LoadingPage';
import FollowingPage from './views/pages/Following';
import FollowerPage from './views/pages/Followers';
// import Profile from './views/pages/Profile';

let globalDispatch = null;

export const getDispatch = () => globalDispatch;

const lazyProfile = lazy(()=>import('./views/pages/Profile'));
function App() {
	const show = useSelector((state) => state.sidebar.show);
	const alertMessage = useSelector((state) => state.alertMessage);
	const dispatch = useDispatch();
	globalDispatch = dispatch;
	return (
		<>
		<div className='flex flex-wrap h-screen'>
			<SideBar />
			<div className='flex-1 flex flex-col overflow-x-hidden'>
				<NavBar />
				<Routes>
					<Route path='/' Component={HomePage} />
					{/* <Route path='/profile' Component={lazyProfile} /> */}
					<Route path='/profile/:pid' Component={lazyProfile} />
					<Route path='/signin' Component={Signin} />
					<Route path='/signup' Component={Signup} />
					<Route path='/question/:qid' Component={QuestionPage} />
					<Route path='/ask' Component={AskQuestion} />
					<Route path='/following' Component={FollowingPage} />
					<Route path='/followers' Component={FollowerPage} />
				</Routes>
				<div onClick={() => dispatch(toggle())} className={`bg-[#00000084] w-screen h-screen absolute top-0 left-0 invisible ${(show && window.innerWidth < 900) ? 'sidebar-background-show' : ''}`}></div>
			</div>
		</div>
		<Alert/>
		<LoadingPage/>
		</>
	);
}

export default App
