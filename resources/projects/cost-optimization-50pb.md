---
id: cost-optimization-50pb
name: 50PB Cost Optimization Program
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
  - Cost optimization
  - Storage
  - Compute
  - Data lifecycle
metrics:
  - label: Monthly savings
    value: 150k USD
  - label: Databricks savings
    value: 2M USD
summary: "Deep archival strategy and compute portability for 50PB of data with substantial monthly savings."
spotlight: secondary
spotlight_order: 2
brief:
  thesis: "A cost-physics program that cut 50PB storage and compute spend without reliability regressions."
  problem: "Cloud costs were scaling faster than usage, threatening margin and velocity."
  constraints:
    - "50PB footprint across multiple workloads."
    - "No degradation in access latency or compliance posture."
    - "Savings had to be measurable and durable."
  approach:
    - "Designed a deep archival strategy for cold data tiers."
    - "Right-sized clusters and shifted select workloads to EKS."
    - "Introduced lifecycle policies and cost governance guardrails."
  proof:
    - "Saved ~$150k/month in storage and compute."
    - "Eliminated ~$2M/year in Databricks DBU spend."
  next: "Automate cost anomaly detection and close the loop with policy-driven scaling."
  writing_id: "cost-optimization-50pb"
---

## Context
Cloud spend was rising with scale. We needed a long-term data lifecycle strategy without degrading access or reliability.

## Constraints
- 50PB of data across multiple workloads.
- Business expectations for access, latency, and compliance.
- Cost cuts must not reduce quality or resiliency.

## What I built
- Deep archival strategy for cold data.
- Workload right-sizing and cluster optimization.
- Migration of select workloads off Databricks to EKS-based clusters.

## Impact
- Identified and realized ~20% cost reduction, about 150k USD per month.
- Saved ~2M USD in Databricks costs.

## Stack
Cloud storage tiers, EKS-based compute, and cost governance workflows.
