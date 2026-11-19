---
mode: testing
url: http://localhost:4000/product/ember-vase
max_steps: 40
tags: [checkout, coupon]
---

# A welcome coupon typed in lowercase (welcome10) still takes 10% off at checkout

<!-- compiled by gremlin from .gremlin/flows/regression/a-welcome-coupon-typed-in-lowercase-welcome10-still-takes-10.md (47846c6e2236f4ee). Edit the flow, not this file. -->

## Step 1: Click Add to cart
Start on http://localhost:4000/product/ember-vase. Click "Add to cart".

## Step 2: Click the cart icon at the top right, then click Checkout
Click the cart icon at the top right, then click "Checkout".

## Step 3: Click the Coupon code field and type welcome10 in all lowercase…
Click the "Coupon code" field and type welcome10 in all lowercase letters. This is the shop's real WELCOME10 welcome code, typed in lowercase the way a customer might. Then click "Apply".

## Step 4: Wait until a message appears under the Coupon code field
Wait until a message appears under the "Coupon code" field.

## Check the expected outcome
Verify that the "Coupon code" field still contains welcome10 in lowercase.
Verify that the message under the "Coupon code" field reads "10% welcome discount applied.".
Verify that the message "That coupon code is not valid." is not shown on the page.
Verify that in the Order summary, the Discount line shows $6.40 off, not $0.00.
Verify that in the Order summary, the Total is $57.60, not $64.00.
