---
layout: post
---
Elimina los espacios duplicados sustituyéndolos por un único espacio, y elimina los del principio y el final.

```ruby
irb(main):003:0> x = ' a bc    f -'
=> " a bc    f -"
irb(main):004:0> x.gsub!(/\s+/, ' ').strip!
=> "a bc f -"
irb(main):005:0> x
=> "a bc f -"
```
