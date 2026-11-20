---
mode: testing
url: http://localhost:4000/
max_steps: 40
---

# My cart still has the mug after I placed the order

<!-- compiled by gremlin from .gremlin/flows/regression/my-cart-still-has-the-mug-after-i-placed-the-order.md (f6878216b85a1dc9). Edit the flow, not this file. -->

## Step 1: Open the Ash Glaze Mug from the shop
Open the Ash Glaze Mug from the shop.

## Step 2: Click Add to cart
Click "Add to cart".

## Step 3: Open the cart and click Checkout
Open the cart and click "Checkout".

## Step 4: Fill in the checkout form with the name Sam Rivera, the email s…
Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland".

## Step 5: Click Place order and wait for the Thank you confirmation page
Click "Place order" and wait for the "Thank you" confirmation page.

## Step 6: Click the cart icon at the top of the page to open the cart
Click the cart icon at the top of the page to open the cart. The order has just been paid for, so do not add, remove or change anything in the cart.

## Check the expected outcome
Verify that the page heading is "Your cart" and the page says "Your cart is empty.".
Verify that the cart page does not list the Ash Glaze Mug or any other item.
Verify that the cart icon at the top shows 0.

## Product rule 1: Every product price, and every amount in a cart or order summary, is shown in US dollars…
Without leaving this page, verify that every product price, and every amount in a cart or order summary, is shown in US dollars with two decimals, like $28.00 (shipping may say Free). If nothing on this page falls under this rule, it holds.
