---
test: ../my-cart-still-has-the-mug-after-i-placed-the-order_test.md
status: passed
started: 2026-11-20T17:34:40.957Z
duration_s: 85
session_id: 54e3c811-9423-48f6-9c95-4fe8e20d032f
---

# My cart still has the mug after I placed the order — Result

## Step 1: Open the Ash Glaze Mug from the shop ✓ passed (1.28s)
md5: f157b12d8899fe1e490509e8c1b28330
Open the Ash Glaze Mug from the shop.

## Step 2: Click Add to cart ✓ passed (0.78s)
md5: 1939bd633f56ecba480d8881cbc86918
Click "Add to cart".

## Step 3: Open the cart and click Checkout ✓ passed (1.58s)
md5: 92d7d84dc6df5201d03f373d247e6d4d
Open the cart and click "Checkout".

## Step 4: Fill in the checkout form with the name Sam Rivera, the email s… ✓ passed (2.2s)
md5: 21aae05bb19000cbd8b5d939f6305285
Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland".

## Step 5: Click Place order and wait for the Thank you confirmation page ✓ passed (4.73s)
md5: 6231c63bd879cb8337e626c1ea1884e1
Click "Place order" and wait for the "Thank you" confirmation page.

## Step 6: Click the cart icon at the top of the page to open the cart ✓ passed (12.12s)
md5: 1ba799b0892f0b74b30030c103678743
Click the cart icon at the top of the page to open the cart. The order has just been paid for, so do not add, remove or change anything in the cart.

## Check the expected outcome ✓ passed (34.9s)
md5: 643773208796de12509273fe0a48c3f2
Verify that the page heading is "Your cart" and the page says "Your cart is empty.".
Verify that the cart page does not list the Ash Glaze Mug or any other item.
Verify that the cart icon at the top shows 0.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars… ✓ passed (23.1s)
md5: f07b1c4f00dc322c744745abddbf30c8
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
