---
id: cost-optimization-50pb
status: draft
title: 50PB and the Cost Curve: A Practical Playbook
date: 2025-01-08
read_time: "10 min"
tags:
  - Cost optimization
  - Storage
  - Data lifecycle
  - Cloud
summary: "A practical approach to reducing cloud spend without breaking reliability or access."
---

## Executive summary
At scale, cost is architecture. I led a cost optimization program across 50PB of data by designing a deep archival strategy, right-sizing compute, and migrating select workloads from Databricks to EKS. The result: ~20% savings, roughly 150k USD per month, plus ~2M USD in Databricks savings.

## Why this mattered
As data volume grows, default storage and compute choices become financially dangerous. We needed a path that preserved access and compliance while improving unit economics.

## Constraints and signals
- 50PB data footprint across multiple pipelines.
- SLA requirements for access and recovery.
- Org-wide budgets with clear monthly targets.

## Architecture (high level)
- Tiered storage with deep archival for cold data.
- Policy-driven lifecycle rules tied to data criticality.
- Compute portability for workloads that did not require Databricks.

## Decisions and tradeoffs
- We traded some convenience for predictable savings by enforcing tiering policies.
- We kept a small buffer of hot data to avoid operational surprises.
- We treated cost deltas as design constraints during change reviews.

## What worked
- Lifecycle rules stopped uncontrolled growth without disrupting teams.
- Workload profiling uncovered surprising candidates for low-cost runtimes.
- Cost visibility improved decision quality across engineering and finance.

## What I would change
- I would create a pre-built cost simulation model earlier to accelerate decision cycles.

## Key takeaways
- Cost optimization is a system, not a one-time cleanup.
- Storage policies and compute portability are the biggest levers at scale.
- The best savings come from structural changes, not discounts.
