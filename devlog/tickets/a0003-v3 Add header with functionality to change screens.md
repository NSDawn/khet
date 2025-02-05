---
id: a0003-v3
version: a.0.0
dateOpened: 2025-01-16
dateClosed: 2025-01-24
tags:
  - ticket
---
# description
Add game state 'screen': string; which stores which screen the player is own
Add a header to the page which allows you to move between screens
# notes
changed screen to spot
```ts
export type Spot = {
	domain: string;
	world: string;
	local: string;
}
```