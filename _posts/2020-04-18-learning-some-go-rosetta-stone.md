---
layout: post
title: "Learning some Go: the Rosetta Stone"
---

The [Rosetta Stone](https://en.wikipedia.org/wiki/Rosetta_Stone) is a black granite slab that was carved with the same text in 3 different languages, around the year 196 BC. These languages were Ancient Greek, Demotic Egyptian and Egyptian hieroglyphs. The latter was never understood until the stone was discovered for the western civilisation.

It seemed the Greek and Demotic texts were telling the same story, so scholars studying these writings had the brilliant assumption the undecipherable hieroglyphs on the top of the stone would also convey the same meaning. They used the known languages as a guide to decipher the hieroglyphs, first finding some easy names such Cleopatra and Ptolemy, later the full text. Being able to translate hieroglyphs opened the gates to understand all the old Egyptian writings out there that were a complete mystery for the modern world.

Nowadays, the Rosetta Stone is displayed at the British Museum. If you wonder how it looks like, I took these pictures in December 2012 (during my first visit to London).

<div class="flex">
<p class="image">
<img src="/public/british_museum.jpg" width="50%"/>
</p>
<p class="image">
<img src="/public/rosetta_stone.jpg" width="50%" />
</p>
</div>

I remember when Golang was released and made [available on Google App Engine](https://blog.golang.org/appengine), in 2011. I already had a Python website running on GAE, and the new language piqued my interest. However, it looked raw and primitive compared to Python, and the lack of HTML templates among other web application goodies that I considered essential… made me discard the novelty. I must say Go provides concurrency features out-of-the-box which is something very attractive, but those weren't tools my website would have benefited from.

Finally, last month I faced some sluggishness at work on some Ruby code we use to read and parse big XML files. It was one of those Ruby limitations: the language is slow, no big surprises here. It's the price we pay for the productivity.

I thought there could be a chance to write that part in a different, faster language. Motivated by [these benchmarks](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go.html) and my past experience with C (too raw), Java (memory hungry), PHP (ugly) and Python (slow) I decided to jump into the unknown and _do something exciting_ such as learning a new language: Go!

Golang is fast, produces very small binaries and does not require lots of memory to run. In terms of language design philosophy, feels like Python to me because its simplicity. Sometimes, even too simple and bare. Feels like C too, but does not let you blow up your foot.
In any case, a 100% orthogonal depart from Ruby.

I've done 2 toy projects so far, an [HTML to PDF conversion server](https://github.com/dncrht/pdfactory) and a [Markdown wiki](https://github.com/dncrht/kwik), and I can list some features any Rubyist will surely find odd:
- compiled, statically typed: you'll have to think twice what you write if you don't want to lose time compiling.
- no built-in REPL to try out quick hacks: although you could use [gore](https://github.com/motemen/gore), it's not as polished.
- error management is done via return values and not exceptions, however there are runtime exceptions.
- missing lots of nice methods for hash and array manipulation.
- gems are awesome.

I'm a firm believer in learning by example, and I found very useful the [official reference guide](https://tour.golang.org/welcome/1), and [this nice site](https://gobyexample.com).
Another convenient way to quickly get the feeling of a language is using something like the Rosetta Stone so your brain can infer new meanings based on prior knowledge.

Here it is such stone, for Ruby, Python and Go:

<table>
  <tr>
    <th>Go</th>
    <th>Python</th>
    <th>Ruby</th>
  </tr>

  <tr>
    <td>
<article class="highlight">
{% highlight go %}
true
false
nil
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
True
False
None
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
true
false
nil
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <th colspan="3">Conditional operators</th>
  </tr>
  <tr>
    <td>
<article class="highlight">
{% highlight go %}
x == nil
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
x is None
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
x.nil?
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <td>
<article class="highlight">
{% highlight go %}
if condition {
  …
} else if condition {
  …
} else {
  …
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
if condition:
  …
elif condition:
  …
else:
  …
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
if condition
  …
elsif condition
  …
else
  …
end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <th colspan="3">Loops</th>
  </tr>
  <tr>
    <td>
<article class="highlight">
{% highlight go %}
for condition {
  …
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
while condition:
  …
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
while condition
  …
end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <td>
<article class="highlight">
{% highlight go %}
for {
  …
  if condition {break}
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
while True:
  …
  if condition:
    break
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
loop do
  …
  break if condition
end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <td>
<article class="highlight">
{% highlight go %}
for key, value := range myMap {
  …
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
for key, value in my_dictionary:
  …
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
my_hash.each do |key, value|
  …
end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <th colspan="3">Lists</th>
  </tr>
  <tr>
    <td>
<article class="highlight">
{% highlight go %}
import "sort"
my_slice := []int{} // also: var my_slice []int
my_slice = append(my_slice, 79)
my_slice = append(my_slice, 19)
b := append(my_slice[:0:0], my_slice...) // duplicate slice
sort.Ints(b) // sort is always in-place
sort.Ints(my_slice)
import "reflect"
reflect.DeepEqual(my_slice, b)
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
my_array = []
my_array.append(79)
my_array.append(19)
b = sorted(my_array)
my_array.sort()
my_array == b
len(my_array) == 2
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
my_array = []
my_array << 79
my_array.append 19
b = my_array.sort
my_array.sort!
my_array == b
my_array.length == 2
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <th colspan="3">Associative arrays</th>
  </tr>
  <tr>
    <td>
<article class="highlight">
{% highlight go %}
import "strconv"
var myMap = map[string]string{}
for i, value := range [3]int{5,6,7} {
  myMap[strconv.Itoa(i)] = strconv.Itoa(value)
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
my_dictionary = {}
for i, value in enumerate([5,6,7]):
  my_dictionary[str(i)] = str()
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
my_hash = {}
[5,6,7].each_with_index do |value, i|
  my_hash[i.to_s] = value.to_s
end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <td>
<article class="highlight">
{% highlight go %}
import "strconv"
var myMap = map[string]string{}
for i, value := range [3]int{5,6,7} {
  myMap[strconv.Itoa(i)] = "a" + strconv.Itoa(value)
}
values := make([]string, 0, len(myMap))
for _, val := range myMap {
  values = append(values, val)
}
if _, ok := myMap["1"]; ok {
  …
}
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight python %}
my_dictionary = {}
for i, value in enumerate([5,6,7]):
  my_dictionary[str(i)] = "a" + str(value)
values = values(my_dictionary)
if "1" in my_dictionary: …
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
my_hash = {}
[5,6,7].each_with_index do |value, i|
  my_hash[i.to_s] = 'a' + value.to_s
end
values = my_hash.values
if my_hash.include?('1') then … end
{% endhighlight %}
</article>
    </td>
  </tr>

  <tr>
    <th colspan="3">Regular expressions</th>
  </tr>
  <tr>
    <td>
<article class="highlight">
{% highlight go %}
import "regexp"
if match, _ := regexp.MatchString("ab", "ab ac ab ad") {
  …
}
r := regexp.MustCompile("ab")
r.FindAllString("ab ac ab ad", -1) // []string{"ab", "ab"}
r.FindString("ab ac ab ad") // "ab"
{% endhighlight %}
</article>
  </td>
  <td>
<article class="highlight">
{% highlight python %}
import re
if re.match(r'ab', 'ab ac ab ad') is not None: …
re.findall(r'ab', 'ab ac ab ad') # ['ab', 'ab']
m = re.match(r'ab', 'ab ac ab ad')
m.group(0) # 'ab'
{% endhighlight %}
</article>
    </td>
    <td>
<article class="highlight">
{% highlight ruby %}
if 'ab ac ab ad' =~ /ab/ then …
'ab ac ab ad'.scan /ab/ # ["ab", "ab"]
m = 'ab ac ab ad'.match /ab/; m[0] # 'ab'
{% endhighlight %}
</article>
    </td>
  </tr>
</table>

Check in often, it may suffer updates from time to time.

If you are interested into other tables for other languages, see:

Examples:

- [C and Go](https://hyperpolyglot.org/c)
- [Swift and Go](http://repo.tiye.me/jiyinyiyong/swift-is-like-go/)
- [Swift and C#](https://myquay.github.io/swift-is-like-c-sharp/)
- [Swift and Ruby](/2016/05/27/swift-is-like-ruby.html)
