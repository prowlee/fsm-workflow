# Workflow History

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-history.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-history.svg)

Workflow History is an extension to FSM Core.  It provies server-side API for storing and extracting Business Object lifecycle history.

## Installation

Install package

```
npm install --save-prod @opuscapita/fsm-workflow-history
```

## Basic Usage

```javascript
// Run migrations and initiate an instance of FSM Workflow History.
const history = await require('@opuscapita/fsm-workflow-history')(sequelize);
```

**history** is JavaScript object with the followign structure/interface:

```javascript
{
  async add({
    from: <string>,
    to: <string>,
    event: <string>,
    businessObjType: <string>,
    businessObjId: <string>,
    user: <string>,
    ?description: <string>,
    workflowName: <string>
  }) {
    ...
    return <History Record>;
  },

  async search({
    ?searchParamater: {
      ?object: {
        ?businessObjType: <string>, // example: 'invoice'
        ?businessObjId: <string> // example: 'john.miller'
      },
      ?user: <string>,
      ?finishedOn: {
        ?gt: <date>, // example: new Date("2018-03-05T21:00:00.000Z")
        ?gte: <date>,
        ?lt: <date>,
        ?lte: <date>
      }
    },
    ?paging: {
      ?max: <number, 100 by default>,
      ?offset: <number, 0 by default>
    },
    ?sorting: {
      ?by: <string, History Record field name, "finishedOn" by default>, // example: 'user'
      ?order: <string, "desc" (default) or "asc">
    }
  }) {
    ...
    return [<History Record>, ... ];
  }
}
```

**History Record** is JavaScript object with values from DB:

| Column           | Type      | Required | Notes                                                            |
|----------------- |-----------|----------|------------------------------------------------------------------|
| id               | integer   | true     | autogenerated id                                                 | 
| from             | string    | true     |                                                                  |
| to               | string    | true     |                                                                  |
| event            | string    | true     |                                                                  |
| businessObjType  | string    | true     | example: 'invoice'                                               |
| businessObjId    | string    | true     | example: '123456789'                                             |
| user             | string    | true     | user initiated a transition                                      |
| description      | string    | false    | event/object/trsnaition information                              |
| finishedAt       | timestamp | true     | like in Grailsflow, object finished the transition in 'to' state |
| workflowName     | string    | true     | unique workflow name, known by workflow machine                  |

See [Express Server Demo](src/demo/server.js) for an example of using Workflow History.