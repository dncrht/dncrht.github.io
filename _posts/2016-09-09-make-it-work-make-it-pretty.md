---
layout: post
---
Recently I've noticed how priorities are a bit broken when comes to writing software.
I've seen many smart engineers fall into this over and over.
The problem is when these priorities mix with very vocal people with big egos, you can't help but sadly watch the project fail.

## Make it work

I think the code has to comply with the requirements. Sounds obvious.
Requirements, or specifications, are what the code must do at this point of time.
I'll stress on _this point of time_, a.k.a. _the present_. Your code has to do the job it's intended to do **now**.

And that priority could be the only one it has to comply with. It well may be there are no other priorities, as long as it works.

Many engineers jump into the optimization wagon too early. They code for extensibility. They apply every pattern in sight. They, in one word, **overengineer**.
Engineering is **not** about pixel perfect code!

High cyclomatic complexity? Spaghetti code? A plain script with no functions or objects? Fear not, if it works, move along. End of story.

_This guy has lost his head._

## Make it pretty

Alright, not end of story.

Your code _may_ evolve in time. requirements might change. and this is the tricky part. Every engineer will have a different hunch about how the requirements will change, and the code will thus be written in a modular fashion to reflect those possible requirement changes, so the engineer in question, a lazy individual, will have an easy time when the occasion to recode finally strikes.

But, do you really know what those requirement changes will be? Nobody knows. The engineer's experience and intuition are the invisible forces that will shape the code. And this is just opinion, not facts. Because if these were facts, they would have been written in the original requirements.

So given the code it's going to change and evolve because we know requirements will change, what's the very next priority we should cover?

Code clarity. Code has to be clear to understand. consider the next [code maintainer is a serial killer](/public/001grg3w.jpg).
It could be *you* in three months time.

Some useful techniques to keep code understandable are:

- meaningful naming for classes, methods, variables
- comments around obscure _whys_: always document the _Why?_, because the _How?_ is the code itself
- low [cyclomatic complexity](http://ruby.sadi.st/Flog.html): few if/case/nested loops
- short classes and methods
- DRY
- single responsibility principle
- avoid object mutation: treat instance vars as immutable properties, pass values to methods that return values
- avoid early optimization: don't optimize unless you know there's a problem. Measure first. The tradeoff when optimizing is always code clarity.

Let's highlight these two priorities:

- 1: code must work
Stop here. Will the requirements eventually change? Carry on reading.
- 2: code must be easy to understand [and optionally for machines to run](http://en.wikiquote.org/wiki/Martin_Fowler)

They can be summarised as _make it work, then make it pretty_. Catchy, isn't it?

Upon this point, your code will meet current requirements and it will be clear enough to easily evolve it in order to meet further requirements.

## New requirements arrive

Oh the dreaded moment. But think positive. Now you know what pieces of code have to be replaced: the current code doesn't meet new specifications.
In this is the precise moment you know what may change in the future, because it's changing at the present.

It's time for you to apply the [behavioural design pattern](https://en.wikipedia.org/wiki/Behavioral_pattern) you like most: template, strategy…

Repeat steps 1 and 2. And add the extra step:

- 3: code must be easy to extend

# What prevents code from scaling?

Understanding _scale_ as _growth_, what prevents scalability is basically the opposite of the above. To mention some common pitfalls:

- metaprogramming: too much magic, difficult to find by string search
- early optimizations: putting a band-aid before having a wound
- acting too clever: others won't understand your cleverness
- excessive indirection: increases cognitive load
- too loosely coupled: lots of little pieces you'll never replace leads a code that resembles a [bag of legos](http://cache-cdn.kalaydo.de/mmo/9/709/927/49_582277364.jpg)
- cyclomatic complexity: it does too much and it's hard to follow
- poor naming: nobody should reverse engineer code to know it's intention
- poor style: it makes it harder to read, at physical level. Use a [style guide](https://github.com/bbatsov/ruby-style-guide)!
- overengineering: early optimization and excessive indirection walk into a bar…

ProTip™: these scalability techniques not only apply to code, but to descriptive languages such as CSS as well!

# In a nutshell

You've probably already noticed I'm advocating for good engineering: pragmatic and elegant. Elegance in simplicity. Pragmatism in results. Optimized when measures prove it's necessary.

Give it a go!

<hr>

_Thanks to [Paul Tsochantaris](http://bru) for proofreading!_
