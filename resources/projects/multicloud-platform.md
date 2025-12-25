---
id: multicloud-platform
name: Multi-Cloud Data Platform
period: "2023-2024"
company: Plume Design Inc
status: production
open_source: false
link_status: ready
link:
  primary:
    type: resume
    label: See in resume
    url: /resume
privacy_note: "Private case study. Details on request."
tags:
  - Multi-cloud
  - Data platform
  - Reliability
  - Cost optimization
metrics:
  - label: Customers enabled
    value: 15M
  - label: Cost reduction
    value: 30%
  - label: Data quality
    value: 50% fewer issues
summary: "Cloud-agnostic data platform architecture to onboard large ISPs on GCP while maintaining AWS parity."
---

## Context
We needed to onboard large ISP customers on GCP while keeping the existing AWS platform reliable and consistent. The platform had to be cloud-agnostic without breaking existing pipelines.

## Constraints
- Zero downtime migration for critical data flows.
- Different cloud primitives and cost models.
- High throughput ingestion and strict data quality expectations.

## What I built
- Multi-cloud architecture and deployment strategy for the data platform.
- Migration paths for streaming and batch workloads.
- Governance and reliability guardrails to keep parity across clouds.

## Impact
- Enabled onboarding for ISPs with 15M customers.
- Reduced infrastructure cost by 30%.
- Cut data quality issues by 50%.

## Stack
GCP and AWS, streaming pipelines, and platform-level abstractions for portability.

