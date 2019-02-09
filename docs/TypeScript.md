Below you will find information on how to use Typescript Elements with this project.<br>

## Table of Contents

- [Add TS custom path](#ts-custom-path)
<br>
<br>

## TS Custom Path

### Step 1
- Edit Package.json and add an item to the moduleMapper
```sh
"^@et/componentUtils(.*)$": "<rootDir>/src/components/utils$1"
```

### Step 2
- Edit tsconfig.json and add an item to the paths
```sh
"@et/componentUtils/*": [
  "components/utils/*"
]
```

### Step 3
- Edit ./env/babel/moduleResolver.js and add an item to the alias list
```sh
'@et/componentUtils': './src/components/utils',
```
