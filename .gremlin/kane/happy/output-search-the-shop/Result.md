---
test: ../search-the-shop_test.md
status: passed
started: 2026-11-20T12:10:07.371Z
duration_s: 50
session_id: 486c282a-a833-46e3-ada3-2c26645215e3
---

# Search finds products by name — Result

## Step 1: Type bowl into the search box and press Enter ✓ passed (2.43s)
md5: 5153ddada94a2a52a69733ba4248ba0e
Start on http://localhost:4000/. Type "bowl" into the search box and press Enter.

## Check the expected outcome ✓ passed (9.91s)
md5: bb03b24d447a88e77f04adb6d4d859d2
Verify that the results page shows the Tide Pool Bowl and the Moss Serving Bowl.
Verify that no mugs are listed in the results.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars… ✓ passed (33.6s)
md5: f07b1c4f00dc322c744745abddbf30c8
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
