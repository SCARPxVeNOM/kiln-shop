---
test: ../coupon-at-checkout_test.md
status: passed
started: 2026-11-20T12:09:18.449Z
duration_s: 38
session_id: 0620276d-0c7d-4cd9-9d48-e2c058bb910c
---

# A welcome coupon takes 10% off — Result

## Step 1: Click Add to cart ✓ passed (1.21s)
md5: daa90ff65400df5e0eed91a92c13fb0e
Start on http://localhost:4000/product/ember-vase. Click "Add to cart".

## Step 2: Go to the checkout page ✓ passed (0.69s)
md5: f27da79dac6835281871f5a3b56c2005
Go to the checkout page.

## Step 3: Type WELCOME10 into the coupon code field and click Apply ✓ passed (2.63s)
md5: 190ea8eeabf25f15696251ddd1abef81
Type WELCOME10 into the coupon code field and click "Apply".

## Check the expected outcome ✓ passed (0.3s)
md5: 13e1049cb3e4b55dbc0d9370f6480f89
Verify that A message says the 10% welcome discount was applied.
Verify that the order summary shows a discount of $6.40.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars… ✓ passed (27.4s)
md5: f07b1c4f00dc322c744745abddbf30c8
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
