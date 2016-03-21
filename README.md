Timbuctoo edit environment and graph query builder
===

[![Build Status](https://travis-ci.org/HuygensING/timbuctoo-edit-client.svg?branch=master)](https://travis-ci.org/HuygensING/timbuctoo-edit-client)

Run query interface in docker
---

The dockerfile assumes the existence of the database as a direct subdir named: "prod_backup_migrated". Without it, the build will fail. The database dir needs to contain production_config.yaml as well in order to succeed.

```sh
# from workdir: /path/to/timbuctoo-edit-client
$ cp production_config.yaml /path/to/prod_backup_migrated/
$ docker build -t huygensing/graph-query .
$ docker run -p 5000:5000 -p 3000:3000 -t huygensing/graph-query
```
