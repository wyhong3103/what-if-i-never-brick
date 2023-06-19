import { apiHandler } from "./apiHandler";
import { ratingCalculator } from "./ratingCalculator";

export const getOptimal = async (handle) => {
    let currentRating = 0;
    // [id, name, date]
    const contestList = await apiHandler.getContestList(handle);
    const res = [];

    for(let i = 0; i < contestList.length; i++){
        const contestData = await apiHandler.getContestData(contestList[i][0]);
        if (!i){
            for(const i of contestData){
                if (i.handle === handle){
                    currentRating = Math.max(0, i.newRating);
                }
            }
            if (currentRating > 0) res.push([currentRating, contestList[i][1], new Date(contestList[i][2] * 1000)]);
        }
        else{
            const delta = ratingCalculator(handle, currentRating, contestData);
            if (delta > 0){
                currentRating += delta;
                res.push([currentRating, contestList[i][1], new Date(contestList[i][2] * 1000)]);
            }
        }
    }

    return res;
};