# Evento

An simple admin panel for events management, that provides the basic functionalities to QUERY, ADD, UPDATE and DELETE events.

## Stack

- Angular
- Ngrx @ngrx/effects, and [@ngrx/entity](https://ngrx.io/guide/entity)
- Ant Design for [Angular](https://ng.ant.design/)
- Firebase

## Files and folders structure

The overall architecture is based on 4 main sections/modules:

### 1 - The Core module

This module is for singleton classes used by all modules, such as route guards, HTTP interceptors, and application level services (logging, error handlers).

The Core module contains also business logic for each feature including the declaration of the feature entities, the state management and the API requests

### 2 - The Blocks module

This module contains page-level components of content such as a common footer, navigation, and header.

### 3 - The Shared module

The shared module contains classes and resources which are used in more than one dynamically loaded module.

### 4 - The Features modules

This modules represent the Presentation layer of the App, it contains a collection of modules which are independent of each other.
Each sub-folder of this module is an independent and lazily loaded feature.
Each Feature contains it own routing logic, and it does not contain any business logic.

## Development server

Run the ng app (dev mode) `npm start`

## Running unit tests

run `npm run test`

Unit tests executed using [Karma](https://karma-runner.github.io).
