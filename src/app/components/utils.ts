
export const makePropGetter = <T extends {}>() =>
   <U extends keyof T>(prop: U, def: T[U]) =>
    (props: T) => props[prop] ?? def;

export const makePropToggle = <T extends {}>() =>
   <U extends keyof T>(prop: U, ifVal: string, elseVal: string) =>
    (props: T) => props[prop] ? ifVal : elseVal;
