// import { useNavigate } from 'react-router-dom';
import { getDispatch } from '../App.jsx';
import { isAuthenticated } from './authorization.js';
import { targetURL } from './constants.js';
import { setAlertMessage, resetAlertMessage } from '../controllers/states/slices/alertslice.js';
export const signInHandle = async (e) => {
    try{
    const res = await fetch(`${targetURL}/signin`, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(e)
    });

    if(res.status == 200){
        const data = await res.json();
        const sessionId = data.token;
        window.localStorage.setItem('sessionid', sessionId);
        getDispatch()(setAlertMessage({
            message: data.message,
            sign: 1
        }));
        console.log(data);
        return true;
    }

    } catch(e){
        console.log(e);
        getDispatch()(setAlertMessage(
            {
                message: 'Server is Offline',
                sign: 2
            }
        ));
        return false;
    }
    getDispatch()(setAlertMessage(
        {
            message: data.message,
            sign: 2
        }
    ));

    return false;
}