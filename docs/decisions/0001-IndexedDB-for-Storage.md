---
parent: Decisions
nav_order: 1
---
# Use IndexedDB for Storage

## Context and Problem Statement

How to store the travel planning data?

## Considered Options

* IndexedDB
* File System Storage
* IndexedDB + Online Storage

## Decision Outcome

Chosen option: "IndexedDB" because it allows for offline usage, does not raise any security concerns, and despite the constraint of 5MB, it provides plenty of storage for our main data type, text.

### Consequences

* Good, provides the offline storage necessary for our product
* Good, compatible with PWA/service worker architecture
* Neutral, constraint of 5MB for storage in enforced
* Bad, highly complex to implement from scratch

## Pros and Cons of the Options

### IndexedDB

Details: 

* Good, stores data offline
* Good, works with service workers, unlike localstorage
* Neutral, maximum of 5MB storage
* Bad, IndexedDB is not easy to use or implement in an application

### File System Storage

* Good, stores data offline
* Good, as much storage as we could want
* Neutral, browser likely controls the actual storage allocation (depends on our methodology of accessing file system)
* Bad, major security concerns with accessing a user's disk storage
* Bad, only feasible options mean either relying on user interaction or greatly extending our package and framework dependencies

### IndexedDB + Online Database (ex. S3 bucket)


* Good, as much storage as we could want
* Bad, requires network and would not be fully functional offline
* Bad, overcomplicates the storage issue by using two solutions

