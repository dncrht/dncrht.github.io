---
layout: post
tags: english
---
Handy oneliner to replace all underscores in filenames with spaces.

```bash
find . -maxdepth 2 -type d -name "*_*" | while read i; do mv -v "$i" "$(echo "$i" | sed 's/_/ /g')"; done
```

In this particular case, we are finding all directories with underscores.