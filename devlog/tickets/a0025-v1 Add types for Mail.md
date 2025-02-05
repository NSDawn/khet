---
id: a0025-v1
version: 
dateOpened: ""
dateClosed: ""
tags:
  - ticket
---
# description
```ts 
type Mail = {
	id: string;
	defaultFrom: string;
	icon: string;
	type: string; // package | invoice | textOnly
}

type MailInstance = {
	id: string;
	from?: string;
	date: number;
	data?: string[];
}
```
also add entries to `t`. 
# notes
