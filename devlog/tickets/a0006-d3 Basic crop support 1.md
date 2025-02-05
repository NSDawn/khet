---
id: a0006-d3
version: a.0.0
dateOpened: 2025-01-16
dateClosed: ""
tags:
  - ticket
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