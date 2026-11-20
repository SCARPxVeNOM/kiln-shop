---
title: Searching for a term that contains a percent sign shows the search
  results page, not an error page
type: regression
platforms:
  - web
start: /
source: capture:github:#3
status: active
tags:
  - search
  - catalog
bug: BUG-001
fail_first: RUN-20261120-163633-e0044c
created: 2026-11-20T11:06:32.647Z
---

1. Type "100% stoneware" into the search box at the top of the page (the box that says "Search mugs, bowls, vases")
2. Click the "Search" button

## Expect

- The page shows a heading that reads Results for “100% stoneware”
- The page does not show "Something went wrong" or "Please try again in a moment."
- The page shows either matching product cards or the message "Nothing matched. Try “mug” or “bowl”."

## Notes

Captured from https://github.com/SCARPxVeNOM/kiln-shop/issues/3:
> Search breaks when I search for 100% stoneware
>
> Hi,
>
> I was looking for pieces that are fully stoneware, so I typed 100% stoneware into the search box and pressed Search. Instead of results I got an error page. Searching for just stoneware works fine.
>
> Thanks,
> Tom
