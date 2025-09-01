import { targetURL } from "./constants";

export const homeQuestions = async () => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                sessionid: sessionid ?? ''
            },
        });
        const body = await res.json();
        console.log(body.questions ?? []);
        if (res.status == 200) {
            return body.questions ?? [];
        }
    } catch (e) {
        console.log(e);
        console.log('server is offline or wrong address');
    }
    return [];
}