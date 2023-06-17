export const apiHandler = (() => {
    const API_BASE_URL = `https://codeforces.com/api/`;

    const getContestData = async (contestID) => {
        const res = await fetch(API_BASE_URL+`contest.ratingChanges?contestId=${contestID}`);
        const ret = await res.json();
        return ret.result;
    }

    return{
        getContestData
    }
})()