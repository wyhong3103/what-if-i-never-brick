import { setProgress } from "../reducers/appStateSlice";
import { apiHandler } from "./apiHandler";
import { ratingCalculator } from "./ratingCalculator";

export const getOptimalSlow = async (handle, dispatch) => {
    let currentRating = 0;
    // [id, name, date]
    const contestList = await apiHandler.getContestList(handle);
    const res = [];

    for(let i = 0; i < contestList.length; i++){
        // Set new progress
        dispatch(setProgress([i, contestList.length]));

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