# Use Angular2 TypeScript decorators in Angular1!

Before:

```typescript
class MyComponent{
    attribute:string;
    onSave:string;
    model:MyModel;
}

angular
    .module('myModule')
    .component('myComponent', {
        templateUrl: 'myComponent.html',
        controller: MyComponent,
        controllerAs: 'vm',
        bindings: {attribute: '<', onSave: '&'},
        require: {model: 'ngModel'}
    });
```

After:

```typescript
@TSHelpers.Component({templateUrl: 'myComponent.html'})
class MyComponent{
    @TSHelpers.Input(/*
        '<' (default), '=', '@'
        add '?' if it is non required
        add custom name in the end
    */) attribute:string;
    @TSHelpers.Output(/*
        set '?' if it is non required
        add custom out name
    */) onSave:string;
    @TSHelpers.Require(
        '^ngModel' // any valid name
    ) model:MyModel;
}

angular
    .module('myModule')
    .component('myComponent', MyComponent);
```
