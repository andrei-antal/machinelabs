## MachineLabs Admin CLI

This is an alpha state CLI for all administration tasks of MachineLabs

### Running Commands

Invoke `./admin-cli/index.js <cmd> [args]`

### Commands

```
admin-cli/index.js <cmd> [args]

Commands:
  deploy [<options>]  Deploy MachineLabs
  login [<options>]   Login to server

Options:
  --help  Show help                                                    [boolean]
```

### Deploy Command

```
admin-cli/index.js deploy [<options>]

Options:
  --help                        Show help                              [boolean]
  --noServer                    Flag to suppress deployment of server  [boolean]
  --noFb                        Flag to suppress deployment of firebase[boolean]
  --cfg.template                Preinitialize googleProjectId, serverName and
                                zone
                                from a template configuration           [string]
  --cfg.target.googleProjectId  GoogleProjectId to be used              [string]
  --cfg.target.serverName       Name of server to be used               [string]
  --cfg.target.zone             Zone of server                          [string]
  --cfg.env                     Environment file for server             [string]
```


### Login Command

```
admin-cli/index.js login [<options>]

Options:
  --help                        Show help                              [boolean]
  --cfg.template                Preinitialize googleProjectId, serverName and
                                zone
                                from a template configuration           [string]
  --cfg.target.googleProjectId  GoogleProjectId to be used              [string]
  --cfg.target.serverName       Name of server to be used               [string]
  --cfg.target.zone             Zone of server                          [string]
  --cfg.env                     Environment file for server             [string]

```