Project generated using `ng new command with routing and scss` configuration selected.

## Added Package list

- @ngrx/component
- @ngrx/effects
- @ngrx/store
- "bootstrap (just the grid system) in styles.css `@import 'bootstrap/scss/bootstrap-grid.scss';`

## .prettierrc

```
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true
}
```

And `craco.config.js` created to paths defined below

## tsconfig.json paths

```
  "baseUrl": "./", // default
  "paths": {
    "@types": ["src/app/types"],
    "@services": ["src/app/services"],
    "@store": ["src/app/store"]
  }
```

## Styles
All components styles are structured to be at the `src/app/styles` directory instead in each component directory