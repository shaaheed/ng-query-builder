// Copyright (c) Sahidul Islam. All Rights Reserved.
// Author: https://github.com/shaaheed

export const uuid = () => {
    return (Math.random() * Math.random() * Date.now()).toString();
}

export const clone = <T>(obj: T): T => {
    return <T>JSON.parse(JSON.stringify(obj))
}

export const isString = (value: any): boolean => {
    return value.constructor.name == 'String';
}