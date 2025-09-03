import { targetURL } from "./constants";

// export const getUserFollow = (pid)

export const followPerson = async (pid) => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/profile/${pid}/follow`, {
            method: 'PATCH',
            headers: {
                "Accept": '*/*',
                sessionid: sessionid ?? ''
            },
        });
        if(res.status == 200){
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}

export const getProfile = async (pid) => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/profile/${pid}`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                sessionid: sessionid ?? ''
            },
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
    return false;
}


export const getUserAnswers = async (pid) => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/profile/${pid}/answers`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                sessionid: sessionid ?? ''
            },
        });
        const body = await res.json();
        return body.answers;
    } catch (e) {
        console.log(e);
    }
    return false;
}