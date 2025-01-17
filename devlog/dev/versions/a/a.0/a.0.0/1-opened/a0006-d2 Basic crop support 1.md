---
id: a0006-d2
dateOpened: 2025-01-16
dateClosed: ""
---
# description
Make type CropData + make cropdata for simple crops wheat, rice and one more
# notes
```ts
type CropData = {
	itemId: string;
	...
	stages: CropStage[];
	...
}
```