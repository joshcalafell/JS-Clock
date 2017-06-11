# JS Clock
A Pen created at CodePen.io. You can find this one at http://codepen.io/rabbitfighter81/pen/EmoOJN.

# Author
* Joshua.Michael.Waggoner@gmail.com

# Description

Written in ES6, this pen uses basic canvas rendering methods and a bit of SohCahToa, to draw an analog clock. Uses a SASS gradient mixin for the background. Makes use of factory functions and lodash.

# About Factory Functions

## Benefits of Using Factories

>Factories are much more flexible than either constructor functions or classes, and they don’t lead people down the wrong path by tempting them with the `extends` keyword and deep inheritance hierarchies. You can inherit from factory functions using a variety of techniques. In particular, check out the Stamp Specification for composable factory functions.

1. Return any arbitrary object and use any arbitrary prototype
For example, you can easily create various types of objects which implement the same API, e.g., a media player that can instantiate players for multiple types of video content which use different APIs under the hood, or an event library which can emit DOM events or web socket events.
Factories can also instantiate objects across execution contexts, take advantage of object pools, and allow for more flexible prototypal inheritance models.

2. No refactoring worries
You’d never have a need to convert from a factory to a constructor, so refactoring will never be an issue.

3. No `new`
No ambiguity about using `new`. Don’t. (It will make `this` behave badly, see next point).

4. Standard `this` behavior
`this` behaves as it normally would, so you can use it to access the parent object. For example, inside `player.create()`, `this` refers to player, just like any other method invocation would. `call()` and `apply()` also reassign `this` as expected.

5. No deceptive `instanceof`

6. Some people like the way `myFoo = createFoo()` reads

## Drawbacks of Factories

1. Doesn’t create a link from the instance to `Factory.prototype` — but this is actually a good thing because you won’t get a deceptive `instanceof`. Instead, `instanceof` will always fail. See benefits.

2. `this` doesn’t refer to the new object inside the factory. See benefits.

3. It may perform slower than a constructor function in micro-optimization benchmarks. Be sure to test in the context of your app if this is a concern for you. 

See the article I got this info from [Here]https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)



 
