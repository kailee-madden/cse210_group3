---
parent: Decisions
nav_order: 4
---
# Use Linting, Code Coverage, Testing, and JSDocs in initial CI/CD pipeline

## Context and Problem Statement

What should be included in our initial CI/CD pipeline?
What should not be included initially (but could be later)?
How do we avoid overcomplicating the CI/CD pipeline before we have a full product?

## Considered Options

* Linting
* Code Coverage
* Testing
* Minification
* Auto Comment Removal
* JS Doc Generation

## Decision Outcome

Chosen option: "Linting", "Code Coverage", "Testing", and "JS Doc Generation". 

### Consequences

* Good, because tests our code before deploying
* Good, because informs us how much our tests are actually testing through code coverage
* Goop, because ensures our code is formatted well
* Good, because auto generates internal documentation
* Good, because keeps our CI/CD pipeline relatively simple and straightforward
* Neutral, because does not include other helpful additions yet
