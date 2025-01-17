import { useTranslation } from "react-i18next";
import { Inventory } from "./Inventory";
import { TFunctionNonStrict } from "i18next";

export function getQueriedInventory(query: string, inventory: Inventory, t: TFunctionNonStrict<"translation", undefined>): Inventory {
    const BonusForContainingQuery = 3;
    const LevenshteinDistanceThreshold = 0;
    const queryLower = query.toLowerCase();
    let distances: Record<string, number> = {};
    inventory.forEach((v) => {
        const entry = t(`item.${v.itemId}`).toLowerCase();
        distances[v.itemId] = getLevenshteinDistance(entry, queryLower);
        if (entry.includes(queryLower)) {
            distances[v.itemId] -= BonusForContainingQuery;
        }
    })
    const out = inventory.filter((v) => 
        distances[v.itemId] <= -query.length + t(`item.${v.itemId}`).length + LevenshteinDistanceThreshold
    ).sort((a, b) => distances[a.itemId] - distances[b.itemId]);
    return out;
}

function getLevenshteinDistance(a: string, b: string): number {
    const lenA = a.length;
    const lenB = b.length;

    const dp: number[][] = Array.from({ length: lenA + 1 }, () =>
      Array(lenB + 1).fill(0)
    );
  
    for (let i = 0; i <= lenA; i++) dp[i][0] = i;
    for (let j = 0; j <= lenB; j++) dp[0][j] = j;
  
    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // Deletion
          dp[i][j - 1] + 1,      // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }
  
    return dp[lenA][lenB];
}