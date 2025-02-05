/**
* lottery.ts
* plans for lottery system
*/

/**
 * lottery will 6 x 6. 
 * encoded using numbers but emojis will be used for the player
 * 0: 💥
 * 1: 🌺
 * 2: 🎲
 * 3: 💎
 * 4: 👑
 * 5: 🥭
 */

/**
 * returns all length 6 tickets.
 * thank u deepseek
 */
function getAllTickets(): number[][] {
    const sequences: number[][] = [];
    const numbers = [0, 1, 2, 3, 4, 5];

    function generate(currentSequence: number[]) {
        if (currentSequence.length === 6) {
            sequences.push([...currentSequence]); // Add the completed sequence
            return;
        }

        for (const num of numbers) {
            currentSequence.push(num); // Add the current number
            generate(currentSequence); // Recurse
            currentSequence.pop(); // Backtrack
        }
    }

    generate([]); // Start with an empty sequence
    return sequences;
}

const allTickets = getAllTickets();
const N = allTickets.length;

/**
 * payout scheme
 * each ticket should cost ~rs 40.
 * therefore the expected value should be ~ rs 25 to rs 30.
 * 
 * 3 of a kind
 * 4 of a kind
 * 5 of a kind
 */

const composition = {
    threeOfAKind: [
        0, 0, 0, 0, 0, 0
    ],
    fourOfAKind: [
        0, 0, 0, 0, 0, 0
    ],
    fiveOfAKind: [
        0, 0, 0, 0, 0, 0
    ],
    sixOfAKind: [
        0, 0, 0, 0, 0, 0
    ],
    halfHalf: 0,
    allUnique: 0,
}

allTickets.forEach((v) => {
    const freq = [0, 0, 0, 0, 0, 0];
    v.forEach((n) => {
        freq[n] ++;
    })
    if (!freq.some((n) => n !== 1)) {
        composition.allUnique ++;
        return;
    }
    if (!freq.some((n) => (n !== 3 && n !== 0))) {
        composition.halfHalf ++;
    }
    freq.forEach((n, i) => {
        if (n === 3) composition.threeOfAKind[i] ++;
        else if (n === 4) composition.fourOfAKind[i] ++;
        else if (n === 5) composition.fiveOfAKind[i] ++;
        else if (n === 6) composition.sixOfAKind[i] ++;
    })
})

// console.log(composition);

const chances = {
    threeOfAKind: composition.threeOfAKind.map((v) => v / N),
    fourOfAKind: composition.fourOfAKind.map((v) => v / N),
    fiveOfAKind: composition.fiveOfAKind.map((v) => v / N),
    sixOfAKind: composition.sixOfAKind.map((v) => v / N),
    halfHalf: composition.halfHalf / N,
    allUnique: composition.allUnique / N,
}

// console.log(chances);

const chanceToWinSomething = 
    chances.threeOfAKind.reduce((a, c) => a + c) +
    chances.fourOfAKind.reduce((a, c) => a + c) +
    chances.fiveOfAKind.reduce((a, c) => a + c) +
    chances.sixOfAKind.reduce((a, c) => a + c) + 
    chances.halfHalf + 
    chances.allUnique
;

//console.log(chanceToWinSomething);

const payouts = {
    threeOfAKind: [1, 60, 60, 60, 60, 60],
    fourOfAKind: [1, 100, 200, 300, 400, 500],
    fiveOfAKind: [1, 1_000, 2_000, 3_000, 4_000, 5_000],
    sixOfAKind: [1, 10_000, 20_000, 35_000, 75_000, 2_00_000],
    halfHalf: 200,
    allUnique: 60,
}

const expectedValue = (
    payouts.threeOfAKind.map((n, i) => n * chances.threeOfAKind[i]).reduce((a, v) => a + v) +
    payouts.fourOfAKind.map((n, i) => n * chances.fourOfAKind[i]).reduce((a, v) => a + v) +
    payouts.fiveOfAKind.map((n, i) => n * chances.fiveOfAKind[i]).reduce((a, v) => a + v) +
    payouts.sixOfAKind.map((n, i) => n * chances.sixOfAKind[i]).reduce((a, v) => a + v) +
    payouts.allUnique * chances.allUnique + 
    payouts.halfHalf * chances.halfHalf);

console.log(expectedValue);