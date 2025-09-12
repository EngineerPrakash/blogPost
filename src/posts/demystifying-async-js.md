---
title: Demystifying Async JavaScript
description: Promises, async/await, and where they shine.
date: 2025-02-11
tags: [tech, javascript]
layout: layouts/post.njk
cover: /assets/cover-abstract-2.svg
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a urna a mi mollis rhoncus. Vivamus aliquet, velit quis dapibus iaculis, justo purus faucibus dui, quis efficitur mi lacus nec lectus. Etiam eu risus non felis dictum dignissim.

```js
async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
```

Suspendisse ac lorem ac augue imperdiet facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

