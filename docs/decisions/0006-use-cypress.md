---
parent: Decisions
nav_order: 6
---
# Use Cypress as a Testing Framework

## Context and Problem Statement

How should we do our testing?
What frameworks can we use for this?

## Considered Options

* Cypress
* Selenium

## Decision Outcome

Chosen option: "Cypress" because it is a developer-friendly automation tool that provides a unique interactive test runner in which it executes all commands. It allows us to create Unit tests, Integration tests and End-to-End tests. It is purely based on JavaScript, and waits automatically for commands and assertions unlike Selenium.

### Consequences

* Good, allows for real-time execution of commands, with visual feedback as they run
* Good, easy environmental set-up and provides ease of scripting
* Bad, limited in that it only supports JavaScript for creating test cases
