export const apiHandler = (() => {
    const API_BASE_URL = `https://codeforces.com/api/`;

    const getContestData = async (contestID) => {
        const res = await fetch(API_BASE_URL+`contest.ratingChanges?contestId=${contestID}`);
        const ret = await res.json();
        return ret.result;
    }

    const getContestList = async (handle) => {
        const res = await fetch(API_BASE_URL+`user.rating?handle=${handle}`);
        const ret = await res.json();
        
        const contests = [];

        for(const i of ret.result){
            contests.push([i.contestId, i.contestName, i.ratingUpdateTimeSeconds]);
        }

        return contests;
    }

    const userExist = async (handle) => {

        const res = await fetch(API_BASE_URL+`user.info?handles=${handle}`);
        const ret = await res.json();

        return ret.status === 'OK';
    }
    
    const apiOK = async () => {
        try{
            const res = await fetch(API_BASE_URL+`user.info?handles=wyhong3103`);
            if (res.status === 404){
                throw new Error('CF API is down');
            }
            return true;
        }
        catch (err){
            console.error(err)
            return false;
        }
    }

    return{
        getContestData,
        getContestList,
        userExist,
        apiOK
    }
})()