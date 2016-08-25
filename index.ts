module TSHelpers {
    import IComponentOptions = angular.IComponentOptions;
    import IDirective = angular.IDirective;

    export function Component(options: IComponentOptions): Function {
        return (controller: Function) => {
            if (controller.prototype.$$componentOptions)
                angular.extend(options, controller.prototype.$$componentOptions);

            if (!options.controllerAs) options.controllerAs = 'vm';

            return angular.extend(options, {controller});
        }
    }

    export function Directive(options: IDirective = {}): Function {
        return (controller: Function) => {
            return angular.extend(options, {controller});
        }
    }

    export function Require(source: string) {
        return function (obj, name) {
            addProperty(obj, name, source, 'require');
        }
    }

    export function Input()
    export function Input(direction: string)
    export function Input(nonRequired: boolean)
    export function Input(direction: string, customOut: string)
    export function Input(direction: string, nonRequired: boolean, customOut: string)
    export function Input(direction: any = '<', nonRequired: any = false, customOut: string = '') {
        if (typeof direction == "boolean") {
            nonRequired = direction;
            direction = '<';
        }
        if (typeof direction == 'string' && typeof nonRequired == 'string') {
            customOut = nonRequired;
            nonRequired = false;
        }

        let value = direction;
        if (nonRequired) value += '?';
        if (customOut) value += customOut;

        return function (obj, name) {
            addProperty(obj, name, value);
        }
    }

    export function Output()
    export function Output(name: string)
    export function Output(nonRequired: boolean)
    export function Output(name: any, nonRequired: boolean)
    export function Output(name: any = '', nonRequired: boolean = false) {
        if (typeof name == 'boolean') {
            nonRequired = name;
            name = '';
        }

        return Input('&', nonRequired, name);
    }

    export interface $OnInit {
        $onInit(): void;
    }

    function addProperty(obj, property, value, core = 'bindings') {
        if (!obj['$$componentOptions']) obj['$$componentOptions'] = {};
        if (!obj['$$componentOptions'][core]) obj['$$componentOptions'][core] = {};
        obj['$$componentOptions'][core][property] = value;
        return obj;
    }
}
