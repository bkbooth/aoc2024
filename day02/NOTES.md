Is there a more efficient way with less testReport calls? Can we heuristically discard some dampened variants?

Currently:

```
totalReports: 1000
testReportCalls: 5711
testDampenedReportCalls: 754

safeReports: 246
safeReportsWithDampening: 318
```

Improved:

```
testReportCalls: 2464
testDampenedReportCalls: 754
safeReportsWithDampening: 318
```
