import { getDispatch } from '../App.jsx';
import { setAlertMessage } from '../controllers/states/slices/alertslice.js';
import { targetURL } from './constants.js';
export const signUpHandle = async (e) => {
    try {
        const res = await fetch(`${targetURL}/signup`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(e)
        });
        if (res.status == 201) {
            const data = await res.json();
            const sessionid = data.token;
            window.localStorage.setItem('sessionid', sessionid);
            getDispatch()(setAlertMessage({
                message: data.message,
                sign: 1
            }));
            return true;
        }
    } catch (e) {
        console.log('cannot connect to server');
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