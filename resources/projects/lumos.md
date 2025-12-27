---
id: lumos
name: Project Lumos
period: "2023-2024"
company: Plume Design Inc
status: production
open_source: true
link_status: pending
link:
  primary:
    type: resume
    label: See in resume
    url: /resume
privacy_note: "Open source repo link pending."
tags:
  - Data governance
  - Metadata
  - Lineage
  - Discovery
metrics:
  - label: Effort saved
    value: 400+ hours per year
  - label: Engineers unblocked
    value: 10 FTE
summary: "Pluggable, tech-agnostic metadata and data governance framework that unified scattered data assets."
spotlight: primary
spotlight_order: 1
brief:
  thesis: "A pluggable metadata and governance layer that made scattered data assets discoverable and trustworthy."
  problem: "Teams lacked a single place for ownership, lineage, and quality, slowing delivery."
  constraints:
    - "Small team, limited calendar time."
    - "Must integrate across heterogeneous stacks without rewrites."
    - "Adoption depended on low-friction onboarding."
  approach:
    - "Defined a universal metadata contract with adapter-based ingestion."
    - "Built lineage capture with versioned asset tracking."
    - "Shipped a self-serve UI for governance workflows."
  proof:
    - "Saved 400+ hours/year in discovery and triage."
    - "Unblocked 10 FTE across teams."
    - "Promoted to priority platform initiative after internal demo."
  next: "Open-source the core engine and scale the connector ecosystem."
  writing_id: "project-lumos"
---

## Context
Data assets were scattered across teams, with no single place for ownership, lineage, or documentation. Engineers lost time finding datasets and resolving data quality issues.

## Constraints
- Built as a side project with a small team on weekends.
- Needed to work across different stacks and storage systems.
- Adoption depended on low friction and clear value.

## What I built
- A metadata and cataloging layer for discovery and ownership.
- Lineage and versioned assets for traceability.
- A pluggable design so teams could integrate without rewrites.

## Impact
- Saved 400+ effort hours annually by reducing manual data discovery and bug triage.
- Became the first-priority platform initiative after an internal demo.

## Stack
Metadata services, lineage pipelines, UI and API surfaces, and integration connectors.
