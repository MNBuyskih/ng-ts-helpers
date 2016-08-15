module TSHelpers {
    import IComponentOptions = angular.IComponentOptions;
    export function Component(options: IComponentOptions): Function {
        return (controller: Function) => {
            if (controller.prototype.$componentOptions)
                angular.extend(options, controller.prototype.$componentOptions);

            if (!options.controllerAs) options.controllerAs = 'vm';

            return angular.extend(options, {controller});
        }
    }

    export function Require(source: string) {
        return function (obj, name) {
            addProperty(obj, name, source, 'require');
        }
    }

    export function Input(direction: string = '<') {
        return function (obj, name) {
            addProperty(obj, name, direction);
        }
    }

    export function Output(name: string = '') {
        return Input(`&name`);
    }

    export interface $OnInit {
        $onInit(): void;
    }

    function addProperty(obj, property, value, core = 'bindings') {
        if (!obj['$componentOptions']) obj['$componentOptions'] = {};
        if (!obj['$componentOptions'][core]) obj['$componentOptions'][core] = {};
        obj['$componentOptions'][core][property] = value;
        return obj;
    }
}