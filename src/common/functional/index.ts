'use strict';
/*
Helper functions for functional patterns
 */

//https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb
export const index = (fn) => {
  const helper = ({ func, args, prevArgs }) => {
    if (args.length + prevArgs.length >= func.length) {
      return func(...prevArgs, ...args);
    }
    return (...newArgs) =>
      helper({
        args: newArgs,
        prevArgs: [...prevArgs, ...args],
        func,
      });
  };
  return (...args) =>
    helper({
      func: fn,
      args: args,
      prevArgs: [],
    });
};

export const pipe = (funcs) =>
  [...funcs].reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

export const pipeM = (chainMethod) => (funcs) =>
  [...funcs].reduce(
    (f, g) =>
      (...args) =>
        f(...args)[chainMethod](g)
  );

export const tap = (message) => (value) => {
  console.log(message);
  console.log(value);
  return value;
};
