---
mode: testing
url: http://localhost:4000/
max_steps: 40
tags: [search, catalog]
---

# Search finds products by name

<!-- compiled by gremlin from .gremlin/flows/happy/search-the-shop.md (b354afb3bf2036a8). Edit the flow, not this file. -->

## Step 1: Type bowl into the search box and press Enter
Start on http://localhost:4000/. Type "bowl" into the search box and press Enter.

## Check the expected outcome
Verify that the results page shows the Tide Pool Bowl and the Moss Serving Bowl.
Verify that no mugs are listed in the results.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars…
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
