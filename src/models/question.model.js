import { targetURL } from "./constants";
export const postUserQuestion = async (e) => {
    try {
        const res = await fetch(`${targetURL}/question`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                'sessionid': window.localStorage.getItem('sessionid') ?? ''
            },
            body: JSON.stringify(e)
        });
        const body = await res.json();
        return {
            message: body.message,
            sign: res.status == 201 ? 1 : 2
        }
    } catch (e) {
        console.log(e);
        return {
            message: 'Server is Offline',
            sign: 2
        }
    }
}


export const getMyQuestions = async () => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/question`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                sessionid: sessionid ?? ''
            },
        });
        if(res.status == 200){
        const body = await res.json();
        return body.questions;
        }
    } catch (e) {
        console.log(e);
    }
    return [];
}

export const getQuestion = async (qid) => {
    try {
        const res = await fetch(`${targetURL}/question/${qid}`, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
            },
        });
        if(res.status == 200){
        const body = await res.json();
        return body.question;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}


export const handleUpvote = async (qid) => {
    const sessionid = window.localStorage.getItem('sessionid');
    try {
        const res = await fetch(`${targetURL}/question/${qid}/upvote`, {
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