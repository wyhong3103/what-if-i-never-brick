import { apiHandler } from "./apiHandler";

export const getOptimalFast = async (handle) => {
    let currentRating = 0;
    // [id, name, date]
    const contestList = await apiHandler.getContestList(handle);
    const res = [];

    const getMaxEligibleRating = (contestName) => {
        const match = [['Div. 4', 1399], ['Div. 3', 1599], ['Div. 2', 2099]];
        for(let i = 0; i < 3; i++){
            if (contestName.indexOf(match[i][0]) !== -1){
                return match[i][1];
            }
        }
        return Infinity;
    };

    for(let i = 0; i < contestList.length; i++){
        if (getMaxEligibleRating(contestList[i][1]) < currentRating) continue;
        // delta = (perf - rating) / 4
        // delta * 4 + rating = perf
        const perf = (contestList[i][4] - contestList[i][3]) * 4 + contestList[i][3];
        const delta = Math.floor((perf - currentRating) / 4);
        if (delta >= 1){
            currentRating += delta;
            res.push([currentRating, contestList[i][1], contestList[i][2]]);
        }
    }

    return res;
};