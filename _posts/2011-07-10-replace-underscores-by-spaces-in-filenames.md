---
layout: post
tags: english
---
Handy oneliner to replace all underscores in filenames by spaces:

```bash
find . -maxdepth 2 -type d -name "*_*" | while read i; do mv -v "$i" "$(echo "$i" | sed 's/_/ /g')"; done
```

In this particular case, we are finding all directories with underscores.

If we need to remove them, this other oneliner comes to the rescue:

```bash
find . -name "*.rb" -print | xargs sed -i '' -e 's/# encoding: UTF-8//g' -e '/./,$!d'
```
