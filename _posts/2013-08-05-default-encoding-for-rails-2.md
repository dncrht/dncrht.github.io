---
layout: post
tags: english rails
---
With the release of Ruby 2.0 the default encoding for files is UTF-8. Thus you no longer need to prepend the magic encoding string to every .rb source file

```ruby
#encoding: UTF-8
```

However, if you have a project that has to be run under Ruby 1.9.x, adding those magic strings to every file can be really cumbersome. Here's the trick:

On Linux systems

```bash
find . -name "*\.rb" | xargs sed -i "1s/^/#encoding: UTF-8\n\n/"
```

On OS X systems, the BSD sed version doesn't behave the same when comes to replace line feeds.
Strange, but yes. Read on:

 - [Newlines in sed on mac](http://cafenate.wordpress.com/2010/12/05/newlines-in-sed-on-mac/)
 - [Newlines in sed on OS X](http://superuser.com/questions/307165/newlines-in-sed-on-mac-os-x)

The best solution for me was install GNU sed first:

```bash
brew install gnu-sed
```

And now run:

```bash
find . -name "*\.rb" | xargs gsed -i "1s/^/#encoding: UTF-8\n\n/"
```
