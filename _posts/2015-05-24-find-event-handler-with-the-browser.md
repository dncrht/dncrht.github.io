---
layout: post
published: false
---
Specially with code bases you're unfamiliar with, it's quite hard to determine which code is handling a given event. You grep through the code randomly searching for the needle in the haystack. It's not the most efficient way as you can see.

Before continuing, I just expect your website works reasonably well without JS; at least search crawlers should be able to index it properly.
Let me advice JS as an enhancement to the user experience, not the be-all-end-all of your site.

The basic principle here is: the browser reacts on user interface events by calling the default event handler or a custom handler we have defined via JS. The browser therefore knows those events you defined in code. So…

## Let's query the browser

Chrome comes with
getEventListeners($('#year').get(0))

(pic)

But I must say, this output was pretty cryptic to my standards.

### Enter jQuery
jQuery is the _de facto_ standard for DOM manipulation and the base for other libraries.
It has a very handy:

$._data($('#year').get(0), "events");

(pic)

## Finding the element

The problem lies in finding the right element. Proposals:

- select the element with the browser inspector, then go to Event Handlers. We might be lucky.
(pic)

- idk

- Label your elements that interact with JS properly. Adding a class with the `js-` prefix will help you identify clearly that element has a JS interaction. You'll never use js- classes for styling. Feel free to name it as you want, but mentioning its interaction in the name is usually a win. I.e: js-open-modal, js-toggle-dropdown, js-submit-xhr
