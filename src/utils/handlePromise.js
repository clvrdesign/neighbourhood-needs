
//https://www.youtube.com/watch?v=wsoQ-fgaoyQ&ab_channel=WesBos
export function handlePromise(promise){
    return Promise.allSettled([promise]).then(function([{value,reason}]){return {data:value,error:reason};});
    }
    