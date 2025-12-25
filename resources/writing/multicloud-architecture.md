---
id: multicloud-architecture
status: draft
title: Designing a Multi-Cloud Data Platform for 15M Customers
date: 2025-01-05
read_time: "12 min"
tags:
  - Multi-cloud
  - Data platforms
  - Reliability
  - Architecture
summary: "How we made a data platform cloud-agnostic without breaking throughput, quality, or cost targets."
---

## Executive summary
I led the architecture for a cloud-agnostic data platform so we could onboard large ISP customers on GCP while keeping AWS parity. The result: 15M customers onboarded, 30% infrastructure cost reduction, and 50% fewer data quality issues.

## Why this mattered
We had a proven AWS platform with large-scale pipelines. A major ISP required GCP. We needed to support both clouds without creating two separate platforms or risking downtime.

## Constraints and signals
- Zero downtime for critical pipelines.
- Ingestion volumes at 40 GB per hour, with strict latency and quality SLAs.
- Cost targets and compliance requirements in two different cloud ecosystems.

## Architecture (high level)
- A cloud-agnostic platform layer that abstracts storage, compute, and orchestration differences.
- Migration paths for streaming and batch workloads with parity testing.
- Quality gates and lineage controls so both clouds produce identical outputs.

## Decisions and tradeoffs
- We prioritized portability over vendor-specific optimizations to reduce long-term operational risk.
- We accepted slight performance overhead in exchange for consistent behavior across clouds.
- We used a phased rollout with canary pipelines to validate parity.

## What worked
- Cloud-agnostic deployment patterns made onboarding faster and more predictable.
- A clear cost-model comparison allowed us to select the best ingestion path for each workload.
- Shared observability reduced the risk of hidden divergence between clouds.

## What I would change
- I would codify a portability test suite earlier to reduce manual checks.
- I would invest sooner in automated cost telemetry per pipeline.

## Key takeaways
- Multi-cloud succeeds when the platform chooses consistency over cleverness.
- A portability layer is only as strong as its validation system.
- Treat cost as a first-class architectural signal, not a post-hoc metric.

