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
    @TSHelpers.Input() attribute:string;
    @TSHelpers.Output() onSave:string;
    @TSHelpers.Require('^ngModel') model:MyModel;
}

angular
    .module('myModule')
    .component('myComponent', MyComponent);
```
