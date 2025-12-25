---
id: project-lumos
status: draft
title: Project Lumos: Building a Governance Framework That Teams Actually Use
date: 2025-01-12
read_time: "11 min"
tags:
  - Data governance
  - Metadata
  - Lineage
  - Platform
summary: "How a weekend side project became a core platform for data discovery, lineage, and trust."
---

## Executive summary
Project Lumos started as a side project to fix a recurring pain: data assets were scattered, ownership was unclear, and quality bugs took too long to resolve. We built a pluggable governance layer for discovery, lineage, and documentation that saved 400+ effort hours annually and became a first-priority platform initiative.

## Why this mattered
Most governance tools fail because they add friction. We needed something engineers would willingly use and that could work across multiple tech stacks without rewrites.

## Constraints and signals
- Small team, built outside core roadmap.
- Needed to integrate with different storage and pipeline systems.
- Adoption had to be obvious in the first week, not month three.

## Architecture (high level)
- Metadata services with versioned assets.
- Lineage graphs linking sources, pipelines, and downstream consumers.
- Lightweight UI and APIs for discovery and ownership.

## Decisions and tradeoffs
- We kept the data model intentionally minimal to encourage adoption.
- We invested in connectors rather than a monolithic system rewrite.
- We focused on accuracy of lineage over depth of visualization.

## What worked
- Teams started using it because it solved a real, daily problem.
- It reduced time spent on bug ownership and data triage.
- The architecture stayed flexible as new systems were added.

## What I would change
- I would automate metadata capture earlier to reduce manual steps.

## Key takeaways
- Governance succeeds when it removes friction, not when it adds process.
- Lineage is a trust mechanism, not just a diagram.
- The best platform tools are boring, reliable, and obvious.

