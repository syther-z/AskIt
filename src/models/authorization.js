import { targetURL } from "./constants";

export async function isAuthenticated() {
    const sessionid = window.localStorage.getItem('sessionid');
    try{
        const res = await fetch(`${targetURL}/user`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                 sessionid: sessionid ?? ''
            },
        });
        const body = await res.json();
        // console.log(body);
        if(res.status == 200){
            return body.user;
        }
    } catch(e){
        console.log(e);
        console.log('server is offline or wrong address');
    }
    return false;
}