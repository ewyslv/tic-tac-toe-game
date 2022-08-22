

export const generateFields = (size = 3) => [...Array(size**2).fill('')];


export const generateMatrix = (arr, size = 3) => {
    const res = [];

    for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        res.push(chunk);
    }
    return res;
};