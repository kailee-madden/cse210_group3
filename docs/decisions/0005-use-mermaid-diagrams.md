---
parent: Decisions
nav_order: 5
---
# Use Mermaid to Create Architecture Diagrams

## Context and Problem Statement

Where should we create our architecture diagrams?
How should we store the diagrams?

## Considered Options

* Mermaid (ie in Markdown files in Git repository)
* Miro
* Figma

## Decision Outcome

Chosen option: "Mermaid" because it brings our code, documentation, and diagrams all together in one central location. The diagrams can be integrated with documentation, comments, and even code snippets. Also, keeping diagrams alongside the code increases the likelihood that the diagrams will be kept updated.

### Consequences

* Good, brings our code, documentation, and diagrams into one central location
* Good, encourages consistent architecture diagram updates since is stored alongside the code
* Bad, slightly more limited in the design of diagrams than a free-form drawing application would be
