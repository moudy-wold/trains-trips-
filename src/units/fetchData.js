let fetchFun = async function fetchData(url) {
    try {
        let fetching = await fetch(url);
        myData = await fetching.json();
        return myData
    } catch (reason) {
        console.log(reason)
    }
}
export default fetchFun