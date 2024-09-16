![theme thumbnail](https://raw.githubusercontent.com/htnabe/HikaeMe/dev/images/tn.png)

# HikaeMe

A simple theme that displays only the bare minimum of elements readers need.

## How to start(WIP)

```
hugo mod init
```

Add the following in your configuration file. If you are using a non-YAML file, the writing style is different.

```
module:
  imports:
    - path: "github.com/htnabe/HikaeMe"
```

Then, execute the next command. You need the environment to execute `node` and `npm` .

```
hugo mod get -u
hugo mod npm pack
npm i
```

## Demo(WIP)

- [My personal blog](https://t-pot.me/)

## Docs(WIP)



## LICENSE

This theme is released under the [MIT](https://opensource.org/license/MIT) License.
