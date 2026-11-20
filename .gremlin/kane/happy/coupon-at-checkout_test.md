---
mode: testing
url: http://localhost:4000/product/ember-vase
max_steps: 40
tags: [checkout, coupon]
---

# A welcome coupon takes 10% off

<!-- compiled by gremlin from .gremlin/flows/happy/coupon-at-checkout.md (e7c8b3c406e2f71d). Edit the flow, not this file. -->

## Step 1: Click Add to cart
Start on http://localhost:4000/product/ember-vase. Click "Add to cart".

## Step 2: Go to the checkout page
Go to the checkout page.

## Step 3: Type WELCOME10 into the coupon code field and click Apply
Type WELCOME10 into the coupon code field and click "Apply".

## Check the expected outcome
Verify that A message says the 10% welcome discount was applied.
Verify that the order summary shows a discount of $6.40.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars…
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
