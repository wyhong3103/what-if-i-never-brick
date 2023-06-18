export const ratingCalculator = (targetHandle, rating, contestants) => {
    const RATING_MIN = -500;
    const RATING_MAX = 5000;
    const seed = new Array(RATING_MAX-RATING_MIN);

    const setRatingOfTarget = () => {
        for(const i of contestants){
            if (i.handle === targetHandle){
                i.oldRating = rating;
            }
            i.delta = 0;
        }
    }

    const precalcSeed = () => {
        const count = new Array(RATING_MAX-RATING_MIN).fill(0);
        for(let i = 0; i < contestants.length; i++){
            count[contestants[i].oldRating+Math.abs(RATING_MIN)]++;
        }

        for(let i = RATING_MIN; i < RATING_MAX; i++){
            seed[i+Math.abs(RATING_MIN)] = 1;
            for(let j = RATING_MIN; j < RATING_MAX; j++){
                seed[i+Math.abs(RATING_MIN)] += (count[j+Math.abs(RATING_MIN)] - (i === j ? 1 : 0)) * (1.0 / (1 + Math.pow(10, (i-j)/400.0)));
            }
        }
    };

    const calcDelta = () => {
        for(let i = 0; i < contestants.length; i++){
            const actualRating = contestants[i].oldRating;
            const actualRank = contestants[i].rank;
            const playerSeed = seed[actualRating+Math.abs(RATING_MIN)];
            const geometricMean = Math.sqrt(actualRank * playerSeed);

            let lo = RATING_MIN, hi = RATING_MAX-1;
            while (hi > lo){
                const mid = lo + Math.floor((hi-lo+1)/2);
                if (seed[mid+Math.abs(RATING_MIN)] >= geometricMean) lo = mid;
                else hi = mid-1;
            }
            
            const expectedRating = lo; 
            contestants[i].delta = Math.floor((expectedRating - actualRating) / 2);
        }
    }

    const correctDelta = () => {
        contestants.sort(
            (a, b) => {
                return b.oldRating - a.oldRating;
            }
        )
        let deltaSum = 0;
        for(const i of contestants){
            deltaSum += i.delta;
        }

        for(let i = 0; i < contestants.length; i++){
            contestants[i].delta += Math.floor( - deltaSum / (contestants.length)) - 1;
        }

        let s = Math.min(contestants.length, Math.floor(4 * Math.pow(contestants.length, 0.5)));

        let sumS = 0;
        for(let i = 0; i < s; i++){
            sumS += contestants[i].delta;
        }

        for(let i = 0; i < contestants.length; i++){
            contestants[i].delta += Math.min(0, Math.max(Math.floor(-sumS / s), -10));
        }
    }

    const getTargetDelta = () => {
        for(let i = 0; i < contestants.length; i++){
            if (contestants[i].handle === targetHandle){
                return contestants[i].delta;
            }
        }
    }

    setRatingOfTarget();
    precalcSeed();
    calcDelta();
    correctDelta();
    return getTargetDelta();
};