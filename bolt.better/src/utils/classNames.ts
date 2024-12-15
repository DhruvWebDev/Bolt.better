/*
In the provided code, the utility function classNames is used to conditionally combine CSS class names. Here's why it's beneficial and how it works:

1. Dynamic Class Name Management:
classNames('relative h-full', className) combines two class names:
'relative h-full': These are hardcoded class names that ensure the div takes up the full height of its parent (h-full) and is positioned relatively (relative).
className: This is a prop passed to the component, which allows for additional custom styles to be applied to the div from its parent component.
The classNames utility function makes it easier to manage multiple classes by combining them into a single string. It helps ensure that both static (fixed) and dynamic (custom or conditional) class names are merged together properly.*/
import { ClassNamesArg } from "src/types";

export function classNames(...args: ClassNamesArg[]): string {
    let classes = '';

    for (const arg of args) {
        classes = appendClass(classes, parseValue(arg));
    }

    return classes;
}



function parseValue(arg: ClassNamesArg) {
    if (typeof arg === 'string' || typeof arg === 'number') {
        return arg;
    }

    if (typeof arg !== 'object') {
        return '';
    }

    if (Array.isArray(arg)) {
        return classNames(...arg);
    }

    let classes = '';

    for (const key in arg) {
        if (arg[key]) {
            classes = appendClass(classes, key);
        }
    }

    return classes;
}

function appendClass(value: string, newClass: string | undefined) {
    if (!newClass) {
        return value;
    }

    if (value) {
        return value + ' ' + newClass;
    }
q
    return value + newClass;
}