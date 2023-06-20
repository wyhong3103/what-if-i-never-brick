import { apiHandler } from "./apiHandler";
import { ratingCalculator } from "./ratingCalculator";

export const getOptimalSlow = async (handle) => {
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
        if (contestList[i][4] <= contestList[i][3]) continue;
        const contestData = await apiHandler.getContestData(contestList[i][0]);
        if (!i){
            for(const i of contestData){
                if (i.handle === handle){
                    currentRating = Math.max(0, i.newRating);
                }
            }
            if (currentRating > 0) res.push([currentRating, contestList[i][1], contestList[i][2]]);
        }
        else{
            const delta = ratingCalculator(handle, currentRating, contestData);
            if (delta > 0){
                currentRating += delta;
                res.push([currentRating, contestList[i][1], contestList[i][2]]);
            }
        }
    }

    return res;
};