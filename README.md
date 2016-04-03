Invoices online constructor
=======================

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone
$ cd invoice-constructor
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch

open in browser [localhost:3000](http://localhost:3000)
```

Structure
---------

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── dist                     # Compiled files
├── interfaces               # Type declarations for Flow
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # Generic React Components
│   ├── constants            # Project constants
│   ├── services             # Helper modules
│   ├── static             # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   └── main.js              # Application bootstrap and rendering
└── tests                    # Unit tests
```
