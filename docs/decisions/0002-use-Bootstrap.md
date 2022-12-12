---
parent: Decisions
nav_order: 2
---
# Use Bootstrap

## Context and Problem Statement

How to quickly develop our application? 
How to create a user-friendly interface and design? 
How to build our frontend?

## Considered Options

* Bootstrap
* Pure CSS
* Alternative Framework (ex. Bulma)

## Decision Outcome

Chosen option: "Bootstrap"

### Consequences

* Good, provides a reliable and highly-adopted framework to develop our frontend
* Good, is mobile first which helps us to consider the mobile UI while developing our frontend that shoudl work for desktop and mobile
* Good, makes developing the frontend quicker and simpler, which is important with a team that has minimal CSS and HTML background
* Bad, creates an additional external dependency

## Pros and Cons of the Options

### Bootstrap

Homepage: <https://getbootstrap.com>

* Good, because supports desktop and mobile
* Good, because provides auto resizing/responsive development 
* Good, because makes the frontend development process easier to help the team meet our time constraints when we have minimal frontend experience
* Neutral, high-adoption rate can often (but not always) indicate that the package or framework is secure, easy to use, and beneficial
* Bad, because it creates an additional external dependency in our project

### Pure CSS

* Good, because can do everything we need for the frontend
* Good, because does not create any additional dependencies in our project
* Bad, because more difficult than working with bootstrap so makes it more difficult to meet our time constraint

### Alternative Framework (ex. Bulma)

Homepage: <https://bulma.io>

* Good, because can do everything we need for the frontend
* Good, because makes the frontend development process easier to help the team meet our time constraints when we have minimal frontend experience
* * Bad, because it creates an additional external dependency in our project
* Bad, less documentation and examples available online than bootstrap to quickly learn the framework

