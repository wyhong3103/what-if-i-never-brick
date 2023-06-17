export const ratingCalculator = (targetHandle, rating, contestants) => {
    const MAX = 5000;
    const seed = new Array(MAX * 2);
    const delta = new Array(contestants.length);
    const perf = new Array(contestants.length);

    const setRatingOfTarget = () => {
        for(const i of contestants){
            if (i.handle === targetHandle){
                i.oldRating = rating;
            }
        }
    }

    const precalcSeed = () => {
        const winProb = new Array(MAX * 4);
        for(let i = 0; i < MAX * 4; i++){
            winProb[i] = 1 / (1 + Math.pow(10, (i-MAX*2) / 400));
        }

        const count = [];
        for(let i = 0; i < MAX*2; i++){
            count.push(0);
        }
        for(const i of contestants) {
            count[i.oldRating + MAX]++;
        }
        
        for(let i = 0; i < 2 * MAX; i++){
            seed[i] = 1;
            for(let j = 0; j < 2 * MAX; j++) {
                if (count[j] === 0) continue;
                seed[i] += (count[j] - (j === i ? 1 : 0)) * winProb[i-j+MAX*2];
            }
        }
    };

    const calcDelta = () => {
        for(let i = 0; i < contestants.length; i++){
            const actualRating = contestants[i].oldRating;
            const actualRank = contestants[i].rank;
            const playerSeed = seed[actualRating+MAX];
            const geometricMean = Math.pow(actualRank * playerSeed, 0.5);

            let lo = 0, hi = MAX * 2 - 1;
            while (hi > lo){
                const mid = lo + Math.floor((hi-lo+1)/2);
                if (seed[mid] >= geometricMean) lo = mid;
                else hi = mid-1;
            }
            
            const expectedRating = lo - MAX; 
            delta[i] = Math.floor((expectedRating - actualRating) / 2);
            perf[i] = expectedRating;
        }
    }

    const correctDelta = () => {
        let deltaSum = 0;
        for(const i of delta){
            deltaSum += i;
        }

        for(let i = 0; i < contestants.length; i++){
            delta[i] += Math.floor( - deltaSum / (contestants.length-1));
        }

        let s = Math.min(contestants.length, Math.floor(4 * Math.pow(contestants.length, 0.5)));
        let sumS = 0;
        for(let i = 0; i < s; i++){
            sumS += delta[i];
        }

        for(let i = 0; i < contestants.length; i++){
            delta[i] += Math.min(0, Math.max(Math.floor(-sumS / s), -10));
        }
    }

    const getTargetDelta = () => {
        for(let i = 0; i < contestants.length; i++){
            if (contestants[i].handle === targetHandle){
                return delta[i];
            }
        }
    }

    setRatingOfTarget();
    precalcSeed();
    calcDelta();
    correctDelta();
    return getTargetDelta();
};