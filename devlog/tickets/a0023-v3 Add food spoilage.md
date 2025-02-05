---
id: a0023-v3
version: 
dateOpened: ""
dateClosed: ""
tags:
  - ticket
---
# description
(1) add `canSpoil` tag to items, which corresponds to `SpoilData`, and `SpoilageModel`.
```ts
type SpoilData = {
	itemId: string;
	resultItemId: string;
	spoilageModelId: string;
}

type SpoilageModel = {
	spoilageModelId: string;
	chances: ChanceToSpoil[];
}

type ChanceToSpoil = {
	temperature: number;
	chance: number;
}
```
(2) Add spoilage data for existing items.
(3) Add function to Inventories to spoil food in that inventory
(4) Add public function updateDay() which contains prior function
# notes
