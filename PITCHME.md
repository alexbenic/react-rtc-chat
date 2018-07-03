<span class="menu-title" style="display: none">Introduction</span>

---?image=https://secure.meetupstatic.com/photos/event/a/e/d/1/600_471944753.jpeg&size=cover

---

## React vs Angular

---
## Brief History of JS
- AngularJS (2010)
- Ember (2011)
- Typescript (2012)
- React (2013)
- Vue (2014)
- Angular (2016)


---
## Problem

@ul
- Latency
- Interactivity
- Money
@ulend

---

## Solution?

---

## Web application!

- Client side routing
- UI/UX improvements
- Progressive/Offline web apps
- REST Api as persistence layer

---

@title[React]

@div[left-50]

<h3> React </h3>

@ul
- View library
- Virtual DOM
@ulend

@divend

@div[right-50]

<h3> !React </h3>

@ul
- Framework
@ulend

@divend

---

@title[Angular]

@div[left-50]

<h3> Angular </h3>

@ul
- Framework
- Feature-full solution
@ulend

@divend

@div[right-50]

<h3> !Angular </h3>

@ul
- Flexible
@ulend

@divend

---

@title[React templates]

## Templates

---
@title[React templates]

<iframe class="stretch" src="https://codesandbox.io/embed/6y96yn405r?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

+++?gist=alexbenic/557e5269d5095dd0c3b91bc3f886c77d&lang=JavaScript&title=No JSX

+++?gist=alexbenic/d071940a712491f33ad227d745b36d92&lang=JavaScript&title=JSX

+++?image=https://cdn.hashnode.com/res/hashnode/image/upload/w_800,c_thumb/sklcdp92gqaxbdo97533/1472289870.png

---
@title[Angular templates]

<iframe class="stretch" src="https://codesandbox.io/embed/54n1v8o1lk?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

+++?gist=mario-petrovic-htec/d43ad72c31d5b6f38e83e22ac61cd85f&lang=html

---
@title[Routing]

## Routing

@ul
- HTML5 history API
- Observing route changes and reacting to them.
- Programmatically change route.
@ulend

---
@title[Angular routing]

<iframe class="stretch" src="https://codesandbox.io/embed/pp9nmy9o3m?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

+++?gist=mario-petrovic-htec/058aa249026bc64ffe38608ab1d10772&lang=Typescript

---
@title[React routing]

<iframe class="stretch" src="https://codesandbox.io/embed/pkl4l3y6z7?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

+++?gist=alexbenic/b70194e9aeef8ff9831e791e21d8ea81&lang=JavaScript

---

### Beveridž

---

### Components
@ul
- Modular & Reusable
- Testable in isolation
- Lifecycle
@ulend

---?gist=alexbenic/b9545c9ee18c7aa298c977f343a322f9&lang=JavaScript

+++?gist=alexbenic/0ef74ec0be8120ca768b9b44c2558654&lang=JavaScript

+++?image=https://cdn-images-1.medium.com/max/800/0*OoDfQ7pzAqg6yETH.&size=contain

---
<iframe class="stretch" src="https://codesandbox.io/embed/l2nw5ln6lz?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

+++?gist=mario-petrovic-htec/2facc86a802a5b00a2aef5cfb106efdf&lang=Typescript

+++?image=https://www.techjini.com/wp-content/uploads/2017/04/lifecycle-hooks-A2-1.png&size=contain

---

### Data flow

@div[left-50]
<h4>React</h4>
@ul
 - One-way data flow
 - view = fn(state)
 - Containers vs Presentational
 - Event propagation
@ulend
@divend

@div[right-50]
<h4>Angular </h4>
@ul
 - One / Two-way data flow
 - ngModel
 - [] and ()
@ulend
@divend

+++?gist=alexbenic/b6c962a184c0ae53a5093ec93b886515

+++?gist=mario-petrovic-htec/a9ee3e5b52047ab267e88d19a30ebab5&lang=JavaScript

---

### State management

@div[left-50]
<h4>React</h4>
@ul
 - this.state
 - Redux
 - MobX
 - Mobx-State-Tree
@ulend
@divend

@div[right-50]
<h4>Angular </h4>
@ul
 - Mutable by default
 - DI
@ulend
@divend

+++?image=https://qph.ec.quoracdn.net/main-qimg-9ec7a00dbd863bc19fbcd46197f6bc04&size=contain

+++?image=https://cdn-images-1.medium.com/max/800/1*_Tf_IR_DdXeu_IZ18p8iDw.png&size=contain

+++

### Action

```
{
  type: "UPDATE_PEOPLE",
  payload: people
});

```

+++

### Reducer

```
switch (action.type) {
  case "UPDATE_PEOPLE": {
    return {
      ...state,
      current: action.payload
    };
  }
}
```

+++

### Reducer

```
switch (action.type) {
  case "UPDATE_PEOPLE": {
    return {
      ...state,
      current: action.payload
    };
  }
}
```

+++

### Saga

```
function* onRemove(action) {
  const name = action.payload
  const person = yield select(store => store.people.current.find(item => item.Name === name))

  // Move person to archived and remove it from current
  yield put({
    type: 'ARCHIVE',
    payload: person,
  })

  const { cancel, del } = yield race({
    cancel: take(action => action.type === 'CANCEL_DELETE'),
    del: call(delay, 5000),
  })

  if(cancel) {
    yield put({
    type: 'REVERT'
  })
  } else {
    yield put({
    type: 'REMOVE_PERSON',
    payload: name,
  })
  }
}
```

---

### Optimization

+++

#### General

@ul
- Analyze ( Perf tool )
- PRPL pattern
- requestIdleCallback & requestAnimationFrame
- WebWorkers
@ulend

+++

#### React

@ul
- ShouldComponentUpdate & PureComponents
- recompose
@ulend

+++

#### Angular

@ul
- TrackBy (loops)
- Pure pipes
- OnPush (change detection)
- Localized change detection (detach component)
@ulend

---

### Types

@ul
- Flow
- Typescript
@ulend

---

### CLI
@ul
- ng cli
- create-react-app
@ulend

---

### Summary

+++

### Angular

@div[left-50]
<h4>Pros: </h4>
@ul
 - Framework, not a view library.
 - Forms, router, http, animation.
@ulend
@divend

@div[right-50]
<h4>Cons: </h4>
@ul
 - Hard rewrite of existing apps to Angular
 - Conventions must be respected
@ulend
@divend

+++

### React
@div[left-50]
<h4>Pros: </h4>
@ul
 - It's a view library, not a framework
 - Scalabel
@ulend
@divend

@div[right-50]
<h4>Cons: </h4>
@ul
 - Needs aditional libs
 - Paralysis by analysis (choose right lib)
@ulend
@divend

---

### Hvala!

---

React: https://goo.gl/4qt6QT <br />
Angular: https://goo.gl/Hfyb4M
