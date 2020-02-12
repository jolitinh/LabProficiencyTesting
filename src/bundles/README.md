# Proficiency Testing UI Bundles

Provides a unified, manageable "backend" to the front-end codebase which uses Redux for breaking down business logic into loosely-coupled "bundles".

Redux Bundler Documentation:

- [Redux Bundler Docs](https://reduxbundler.com/)
- [Docs (on Github)](https://github.com/HenrikJoreteg/redux-bundler/tree/master/docs)
- [Human Redux](https://read.reduxbook.com/)
- [Redux Bundler Example App](https://github.com/HenrikJoreteg/redux-bundler-example)

## Usage

### {bundle-name}.js

> Note the use of conventions in these files such as:
>
> - **select**Something
> - **do**SomethingElse
> - **react**OnThisThing
>
> where the usage of select, do, and react, are what redux-bundler uses to manage everything in the global store.

The structure of these files will contain an object which has the following properties:

- Name (`name`: string) - name as accessed from the redux store.
- Reducer (`getReducer`: function) - a normal Redux reducer definition
- Selectors (`select*`: function) - [selectors](https://github.com/reduxjs/reselect) which subscribe to pieces of the state and return complex derived values based on that state
- Action Creators (`do*`: function) - action creators which also can use a thunk-based middleware using promises
- Reactors (`react*`: function) - subscribe to pieces of state and trigger actions based on that state
- Store-attached functions (`getExtraArgs`: function) - These special functions get passed into action creators to contain helpers which have access to the global store. Primarily used in cases like API middleware

### routes.js

Update the following block as shown below to create both static/dynamic routes. In this case, `:id` gets populated in the selector `selectRouteParams` as `routeParams.id`. This gives us some superpowers combined w/ our selectors and reactors to derive and act upon dynamic URL state.

```javascript
// In routes.js:

export default createRouteBundle({
  '/': HomePage,
  '/dashboard': DashboardPage, // static route
  '/users': UsersPage, // static route
  '/users/:id': UserDetailPage, // dynamic route
});
```
