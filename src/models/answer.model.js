import { targetURL } from "./constants";
export const postUserAnswer = async (e, qid) => {
    try {
        const res = await fetch(`${targetURL}/question/${qid}/answer`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                'sessionid': window.localStorage.getItem('sessionid') ?? ''
            },
            body: JSON.stringify({
                content: e
            })
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


export const getAnswersToQuestion = async (qid) => {
    try {
        const res = await fetch(`${targetURL}/question/${qid}/answer`, {
            method: 'GET',
            headers: {
                "Content-type": '*/*',
                'sessionid': window.localStorage.getItem('sessionid') ?? ''
            },
        });
        const body = await res.json();
        // console.log(body);
        return body.answers;
    } catch (e) {
        console.log(e);
        return [];
    }
}