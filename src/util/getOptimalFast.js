import { apiHandler } from "./apiHandler";

export const getOptimalFast = async (handle) => {
    let currentRating = 0;
    // [id, name, date]
    const contestList = await apiHandler.getContestList(handle);
    const res = [];

    for(let i = 0; i < contestList.length; i++){
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