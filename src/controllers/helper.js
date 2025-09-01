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