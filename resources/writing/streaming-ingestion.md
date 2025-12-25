---
id: streaming-ingestion
status: draft
title: Rebuilding Streaming Ingestion for Cost, Latency, and Quality
date: 2025-01-15
read_time: "9 min"
tags:
  - Streaming
  - Data platforms
  - Cost optimization
  - Reliability
summary: "Why we moved from Lambda-based ingestion to Spark Streaming and how it reduced cost and data quality issues."
---

## Executive summary
I redesigned a Lambda-based ingestion framework for YugabyteDB into a Spark Streaming pipeline that handled 40 GB per hour with better latency and higher data quality. The change reduced infrastructure cost by 30% and cut data quality issues by 50%.

## Why this mattered
The existing ingestion approach was expensive at scale and produced inconsistent data quality across markets. We needed a streaming pipeline that could scale predictably and behave consistently under load.

## Constraints and signals
- 40 GB per hour ingestion load.
- Cost and latency had to improve simultaneously.
- Multiple market deployments with different cloud cost profiles.

## Architecture (high level)
- Spark Streaming ingestion with explicit schema validation.
- Benchmark-driven choice between streaming and file-based ingestion.
- Unified monitoring for latency and error rates.

## Decisions and tradeoffs
- We traded some Lambda convenience for predictable throughput and cost.
- We used benchmarking to choose the right ingestion mode per market.
- We treated data quality as a first-class output, not an afterthought.

## What worked
- Stable latency under peak load.
- Clear cost breakpoints for streaming vs file-based options.
- Fewer quality regressions due to consistent validation.

## What I would change
- I would invest in replay tooling earlier to speed incident recovery.

## Key takeaways
- Streaming is not always cheaper, but it is more predictable when designed well.
- Benchmarking is essential before committing to a data ingestion strategy.
- Data quality improves when validation is part of the pipeline, not a downstream check.

