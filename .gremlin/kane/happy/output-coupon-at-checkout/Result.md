---
test: ../coupon-at-checkout_test.md
status: passed
started: 2026-11-18T10:34:34.902Z
duration_s: 88
session_id: aa0a8456-42a8-4111-ba81-673cc2fb1ee4
---

# A welcome coupon takes 10% off — Result

## Step 1: Click Add to cart ✓ passed (18.9s)
md5: daa90ff65400df5e0eed91a92c13fb0e
Start on http://localhost:4000/product/ember-vase. Click "Add to cart".

## Step 2: Go to the checkout page ✓ passed (15.2s)
md5: f27da79dac6835281871f5a3b56c2005
Go to the checkout page.

## Step 3: Type WELCOME10 into the coupon code field and click Apply ✓ passed (31.5s)
md5: 190ea8eeabf25f15696251ddd1abef81
Type WELCOME10 into the coupon code field and click "Apply".

## Check the expected outcome ✓ passed (18.7s)
md5: 13e1049cb3e4b55dbc0d9370f6480f89
Verify that A message says the 10% welcome discount was applied.
Verify that the order summary shows a discount of $6.40.
