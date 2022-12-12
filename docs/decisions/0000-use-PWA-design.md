---
parent: Decisions
nav_order: 0
---
# Use Progressive Web Application

## Context and Problem Statement

How to make the application local-first ?
How to support multimodal use?
How to support the future maintenance of the product, without trying to "future-proof" it?

## Considered Options

* PWA
* Electron
* Cordova

## Decision Outcome

Chosen option: "Progressive Web App" because it best supports the current and future goals of the travel planner application. Specifically, it supports two of our key values - availability and usability. Using a PWA means that we can support multimodal, despite the time constraints of our project, and that the user has the same experience offline, online, and on different devices, which means the application is highly usable/user-friendly.

### Consequences

* Good, because after initial download and setup, users can work offline exactly the same as if they were online 
* Goop, because the development environment supports desktop and mobile without needing to modify the main codebase
* Good, because can take advantage of platform specific features, such as push notifications
* Good, because lower anticipated maintenance costs since future of product would only require supporting one application for mobile and desktop
* Neutral, because PWAs and service workers have the potential to become complex if not developed carefully
* Bad, because performance is not as good as native apps

## Pros and Cons of the Options

### PWA

Details: <https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps>

* Good, because supports desktop and mobile
* Good, because more flexibility with the development of the application
* Good, because supports offline scenarios
* Neutral, looks different initially from a native app although functions similarly
* Bad, because service workers can become complicated quickly but also provide great functionality

### Electron

Homepage: <https://www.electronjs.org>

* Good, because provides easy to follow framework to build a desktop app
* Good, because has high adoption by industry
* Good, because supports offline scenarios
* Bad, because only supportive of desktop applications not mobile
* Bad, because need to learn the framework 

### Cordova

Homepage: <https://cordova.apache.org>

* Good, because provides easy to follow framework to build a mobile app
* Good, because has high adoption by industry
* Good, because supports offline scenarios
* Bad, because only supportive of mobile applications not desktop
* Bad, because need to learn the framework
