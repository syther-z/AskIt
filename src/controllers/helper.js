import { followPerson } from "../models/interaction";

export const getRandomColor = () => {
    const arr =[
        'bg-red-200',
        'bg-green-100',
        'bg-violet-200',
        'bg-blue-100',
        'bg-purple-200'
    ];

    return arr[Math.round(Math.random() * arr.length)];
}

export const getTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diff = Math.floor((now - posted) / 1000); // seconds diff

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
};


let followTimeOut = null;
export const followHandle = (initial, curr, pid) => {
    if(followTimeOut != null) clearTimeout(followTimeOut);
    followTimeOut = setTimeout(() => {
        console.log(initial, ' ', curr);
        if(initial != curr) return;
        followPerson(pid);
    }, 1000);
}