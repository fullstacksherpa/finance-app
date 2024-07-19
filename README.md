# Local-first budget tracking and allocation mobile app.

key features of this app:

- Keep track of all your accounts, and the allocation percentages
- Will simplify the allocation process, by calculating the allocation amounts for every account.
- Keep track of past allocations, giving you an insights of how your business is doing.
- local first approach (watermelonDB) and data are sync with remote db as well.

# Tech stack used in this project

- React Native
- Expo
- WatermelonDB
-

# Why WatermelonDB 🍉

<details>
  <summary>We used watermelonDB because .....</summary>
 <br/> <p>WatermelonDB is a new way of dealing with user data in React Native and React web apps.</p>
  <p>It's optimized for building complex applications in React Native, and the number one goal is real-wordl performance. In simple words, your app must launch fast.</p>
  <p>For simple apps, using Redux or MobX with a persistence adapter is the easiest way to go. but when you start scaling to thousands or tens of thousands of database records, your app will now be slow to launch . Loading a full database into javascript is expensive!. </p>
  <p>Watermelon fixes it by being lazy. Nothing is loaded until it's requested. And since all querying is performed directly on the rock-solid SQLite database on a seperate native thread, most queries resolve in an instant.</p>
  <p>But unlike using SQLite directly, Watermeon is fully observable. So whenever you change a record, all UI that depends on it will automatically re-render.</p>
</details>

# 🍉 WatermelonDB Setup with expo

### 1. installation

```shell
npx expo install @nozbe/watermelondb

npm install -D @babel/plugin-proposal-decorators
```

### 2. Add ES6 decorators support to your babel.config.js

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  };
};
```

### 3. IOS setup (linking watermelonDB with native library)

<p>In React Native (expo) project, we use `expo-build-properties` to change the pod file.It is a config plugin that allows customizing native build properties during prebuild. This config plugin configures how Prebuild command generates the native android and ios folders and therefore cannot be used with projects that don’t run npx expo prebuild </p>
app.json

```json
 "plugins": [
      "expo-router",
      [
        "expo-build-properties",
        {
          "ios": {
            "extraPods": [
              {
                "name": "simdjson",
                "configurations": ["Debug", "Release"],
                "path": "../node_modules/@nozbe/simdjson",
                "modular_headers": true
              }
            ]
          }
        }
      ]
    ],
```

### 4. db/schems.ts

```typescript
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "accounts",
      columns: [
        { name: "name", type: "string" },
        { name: "cap", type: "number" },
        { name: "tap", type: "number" },
      ],
    }),
  ],
});
```

### 5. db/migrations.ts

```typescript
import { schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    // We'll add migration definitions here later
  ],
});
```

###6. db/index.ts

```typescript
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
// import Post from './model/Post' // ⬅️ You'll import your Models here

import Account from "../model/Account";

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Account],
});

export default database;

export const accountsCollection = database.get<Account>("accounts");
```

### 6. Time to make our component reactive

<p>We can fetch the data from local watermelonDB and then render it in components but the only problem is that this is not reactive. if the data updated or deleted, the component will not re-render to reflect the changes.</p> <p>to make component rerender when data change we need to make the data observe automatically</p>

```typescript
import { withObservables } from "@nozbe/watermelondb/react";

//we are creating enhance higher order components and wrapping required component by this HOC.

//the first parameter of withObservables is the dependency like useEffect and second is callback function that received the props that the children component is receiving. our AccountList component is receiving accounts props so we are providing that props  through callback function. this HOC is quering accounts and rerendering components if value changes.

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
}));

const EnhancedAccountsList = enhance(AccountList);
export default EnhancedAccountsList;
```

Now, if we render `<EnhancedAccountsList />`, it will update every time the accounts changes.
