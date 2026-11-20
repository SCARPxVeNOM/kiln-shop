---
mode: testing
url: http://localhost:4000/
max_steps: 40
tags: [search, catalog]
---

# Searching for a term that contains a percent sign shows the search results page, not an error page

<!-- compiled by gremlin from .gremlin/flows/regression/searching-for-a-term-that-contains-a-percent-sign-shows-the.md (acaa24d122dd6ca3). Edit the flow, not this file. -->

## Step 1: Type 100% stoneware into the search box at the top of the page…
Start on http://localhost:4000/. Type "100% stoneware" into the search box at the top of the page (the box that says "Search mugs, bowls, vases").

## Step 2: Click the Search button
Click the "Search" button.

## Check the expected outcome
Verify that the page shows a heading that reads Results for “100% stoneware”.
Verify that the page does not show "Something went wrong" or "Please try again in a moment.".
Verify that the page shows either matching product cards or the message "Nothing matched. Try “mug” or “bowl”.".
