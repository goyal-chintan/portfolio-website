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
spotlight: secondary
spotlight_order: 3
brief:
  thesis: "A multi-cloud platform that preserved AWS parity while onboarding ISPs on GCP at scale."
  problem: "New ISP customers required GCP, but the platform was AWS-native."
  constraints:
    - "Zero-downtime migration for critical pipelines."
    - "Different cloud primitives and cost models."
    - "Strict data quality and reliability SLAs."
  approach:
    - "Defined cloud-agnostic abstractions for storage and compute."
    - "Built migration paths for streaming and batch workloads."
    - "Added governance and observability guardrails to maintain parity."
  proof:
    - "Enabled onboarding for 15M customers."
    - "Reduced infra cost by 30%."
    - "Cut data quality issues by 50%."
  next: "Harden portability tests and expand automated parity validation."
  writing_id: "multicloud-architecture"
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
