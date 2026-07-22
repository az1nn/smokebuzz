# HTML Images to React Native Assets

## Context
The project has a large `index.html` (4.8MB) with 9 base64-encoded PNG images embedded directly in the HTML. These images represent:
- Brand/logo (used 5 times): SmokeBuzz Tabacaria logo (cat smoking cigar)
- 4 product images: Seda Zomo Branca, Seda Zomo Marrom Natural, Piteira Longa Girls in Green, Piteira Tradicional Papelito

The React Native app currently uses emoji placeholders for product images (`🚬`, `🔥`, `💥`, `🥃`, `🏺`, `🪣`, `📄`, `🧻`, `👝`).

## Problem
1. Base64 images in HTML bloat the file size (4.8MB) and are not usable in React Native
2. Product data uses emoji strings instead of actual product images
3. No custom hooks architecture exists - all logic is inline in components

## Objectives
1. Extract all unique base64 images from HTML and save as PNG files in `assets/`
2. Replace emoji placeholders with actual product images in React Native app
3. Implement custom hooks architecture for all business logic (products, cart, checkout, navigation)
4. Update product data to match the 4 products shown in the HTML "Destaques" section
5. Ensure TypeScript types support React Native `ImageSourcePropType`