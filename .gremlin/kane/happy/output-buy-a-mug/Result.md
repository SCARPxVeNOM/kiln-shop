---
test: ../buy-a-mug_test.md
status: failed
started: 2026-11-20T12:08:33.276Z
duration_s: 35
session_id: 15ef66c0-3332-481c-87dd-346f9976cf79
---

# A shopper can buy a mug — Result

## Step 1: Open the Ash Glaze Mug from the shop ✓ passed (1.27s)
md5: f157b12d8899fe1e490509e8c1b28330
Open the Ash Glaze Mug from the shop.

## Step 2: Click Add to cart ✓ passed (0.68s)
md5: 1939bd633f56ecba480d8881cbc86918
Click "Add to cart".

## Step 3: Open the cart and click Checkout ✓ passed (1.35s)
md5: 92d7d84dc6df5201d03f373d247e6d4d
Open the cart and click "Checkout".

## Step 4: Fill in the checkout form with the name Sam Rivera, the email s… ✓ passed (1.69s)
md5: 21aae05bb19000cbd8b5d939f6305285
Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland".

## Step 5: Click Place order ✓ passed (0.66s)
md5: f1a777c591730db89335031e294806dc
Click "Place order".

## Check the expected outcome ✓ passed (0.32s)
md5: 0ddb171520881121bd3930caf9773834
Verify that an order confirmation page says "Thank you, Sam Rivera!".
Verify that the confirmation shows an order number.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars… ✓ passed (0.23s)
md5: f07b1c4f00dc322c744745abddbf30c8
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.

## Product rule 2: Once an order is confirmed, the cart count at the top right of the page shows 0 ✗ failed (23.6s)
md5: 1cf76d94deaaa0cf8b6774d20f2fbe2b
Reason: Final verification failed: "Once an order is confirmed, the cart count at the top right of the page shows 0." — bug verdict: Confirmed order leaves cart badge at 1 [application_issue/ui_state_mismatch, confidence 0.98]
Without leaving this page, verify that once an order is confirmed, the cart count at the top right of the page shows 0. If nothing on this page falls under this rule, it holds.
