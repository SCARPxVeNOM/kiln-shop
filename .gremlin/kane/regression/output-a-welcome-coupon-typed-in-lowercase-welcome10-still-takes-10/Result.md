---
test: ../a-welcome-coupon-typed-in-lowercase-welcome10-still-takes-10_test.md
status: passed
started: 2026-11-19T20:39:47.061Z
duration_s: 87
session_id: c4cc7f50-4a8d-4866-b655-3046fdf10285
---

# A welcome coupon typed in lowercase (welcome10) still takes 10% off at checkout — Result

## Step 1: Click Add to cart ✓ passed (1.19s)
md5: daa90ff65400df5e0eed91a92c13fb0e
Start on http://localhost:4000/product/ember-vase. Click "Add to cart".

## Step 2: Click the cart icon at the top right, then click Checkout ✓ passed (1.43s)
md5: c6cd5602a19adfbe0aeeb28c3dbb84c1
Click the cart icon at the top right, then click "Checkout".

## Step 3: Click the Coupon code field and type welcome10 in all lowercase… ✓ passed (2.46s)
md5: 1ce4928d5c796a61d7e895b9fa5a66e2
Click the "Coupon code" field and type welcome10 in all lowercase letters. This is the shop's real WELCOME10 welcome code, typed in lowercase the way a customer might. Then click "Apply".

## Step 4: Wait until a message appears under the Coupon code field ✓ passed (40.62s)
md5: df57de1e5383929825cf7feb02d0ff3a
Wait until a message appears under the "Coupon code" field.

## Check the expected outcome ✓ passed (35.6s)
md5: 8f962e2d0c473d2520fb30ec46bed00a
Verify that the "Coupon code" field still contains welcome10 in lowercase.
Verify that the message under the "Coupon code" field reads "10% welcome discount applied.".
Verify that the message "That coupon code is not valid." is not shown on the page.
Verify that in the Order summary, the Discount line shows $6.40 off, not $0.00.
Verify that in the Order summary, the Total is $57.60, not $64.00.
