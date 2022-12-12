---
parent: Decisions
nav_order: 7
---
# Use Jasmine for Unit Testing

## Context and Problem Statement

How should we do our unit testing?
What frameworks can we use for this?

## Considered Options

* Jasmine
* Jest

## Decision Outcome

Chosen option: "Jasmine" because it is based on Behavior-Driven Development (BDD), meaning that it involves writing tests before writing the actual code. It is DOM-less, meaning it does not need a browser to run. It provides a clean and easy-to-understand syntax, and also a rich and straightforward API for writing unit tests.
Batteries also included. Jasmine is a batteries included library; it does not require extenral mocking libraries and additional assertions assertions, and is relatively fast. 

### Consequences

* Good, independent of external libraries and is fast since it is battery included
* Good, clean and easy to understand syntax
* Bad, requires many configurations to set up
