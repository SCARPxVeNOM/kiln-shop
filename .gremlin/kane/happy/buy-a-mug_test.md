---
mode: testing
url: http://localhost:4000/
max_steps: 40
tags: [checkout, cart]
---

# A shopper can buy a mug

<!-- compiled by gremlin from .gremlin/flows/happy/buy-a-mug.md (245c9400c9533864). Edit the flow, not this file. -->

## Step 1: Open the Ash Glaze Mug from the shop
Open the Ash Glaze Mug from the shop.

## Step 2: Click Add to cart
Click "Add to cart".

## Step 3: Open the cart and click Checkout
Open the cart and click "Checkout".

## Step 4: Fill in the checkout form with the name Sam Rivera, the email s…
Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland".

## Step 5: Click Place order
Click "Place order".

## Check the expected outcome
Verify that an order confirmation page says "Thank you, Sam Rivera!".
Verify that the confirmation shows an order number.
