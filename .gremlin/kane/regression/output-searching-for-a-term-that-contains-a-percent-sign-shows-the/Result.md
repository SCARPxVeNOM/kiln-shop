---
test: ../searching-for-a-term-that-contains-a-percent-sign-shows-the_test.md
status: passed
started: 2026-11-20T11:10:11.773Z
duration_s: 39
session_id: efd083d0-af53-49c9-a151-383df91cb9db
---

# Searching for a term that contains a percent sign shows the search results page, not an error page — Result

## Step 1: Type 100% stoneware into the search box at the top of the page… ✓ passed (2.08s)
md5: 9a39597778b9def907b12d1baa8b7282
Start on http://localhost:4000/. Type "100% stoneware" into the search box at the top of the page (the box that says "Search mugs, bowls, vases").

## Step 2: Click the Search button ✓ passed (0.88s)
md5: b2273409d32396596003c4a9f7f28b95
Click the "Search" button.

## Check the expected outcome ✓ passed (29.6s)
md5: 55465372a54aec26beba8191ddd7376b
Verify that the page shows a heading that reads Results for “100% stoneware”.
Verify that the page does not show "Something went wrong" or "Please try again in a moment.".
Verify that the page shows either matching product cards or the message "Nothing matched. Try “mug” or “bowl”.".
