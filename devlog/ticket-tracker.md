latest ticket: `$= dv.pages("#ticket").where((v) => v.id).sort((a, b) => a.id > b.id)[0].file.link`
## a.0.1
```dataview
TABLE id, dateOpened, dateClosed 
FROM #ticket 
WHERE version = "a.0.1"
SORT dateClosed DESC
```
## a.0.0
```dataview
TABLE id, dateOpened, dateClosed 
FROM #ticket 
WHERE version = "a.0.0"
SORT dateClosed DESC
```

## backlog
```dataview
TABLE id, dateOpened, dateClosed 
FROM #ticket 
WHERE version = NULL
SORT dateClosed DESC
```

