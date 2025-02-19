# 🛍️ E-Commerce App  

A **full-stack e-commerce** application built using **Vite, React, Tailwind CSS, and TypeScript**. This project provides a smooth shopping experience, allowing users to browse products, add them to a cart, and proceed to checkout.  

## 🚀 Features  

✅ **Product Listing** – View all products fetched from an external API.  
✅ **Category Pages** – Browse products by categories: Clothes, Electronics, Furniture, and Toys.  
✅ **Product Details** – Click on a product to view its details.  
✅ **Add to Cart** – Easily add items to the cart using a floating `+` button.  
✅ **Cart Management** – Increase/decrease quantity, remove items, and view total price.  
✅ **Checkout Page** – Review and confirm orders before checkout.  
✅ **Smooth UI/UX** – Built with **Tailwind CSS** for a responsive design.  

---

## 🛠️ Tech Stack  

- **Frontend**: React (Vite) + TypeScript  
- **UI Styling**: Tailwind CSS  
- **State Management**: React Hooks  
- **API**: [FakeStore API](https://api.escuelajs.co/api/v1/products)  
- **Icons**: Heroicons (SVG icons)  

---

## 📂 Project Structure  

📦 e-commerce-app
┣ 📂 src
┃ ┣ 📂 components
┃ ┃ ┣ 📜 Navbar.tsx
┃ ┃ ┣ 📜 Cart.tsx
┃ ┃ ┣ 📜 ProductCard.tsx
┃ ┣ 📂 pages
┃ ┃ ┣ 📜 All.tsx
┃ ┃ ┣ 📜 Clothes.tsx
┃ ┃ ┣ 📜 Electronics.tsx
┃ ┃ ┣ 📜 Furniture.tsx
┃ ┃ ┣ 📜 Toys.tsx
┃ ┃ ┣ 📜 Details.tsx
┃ ┣ 📂 api
┃ ┃ ┣ 📜 index.ts (Handles API calls)
┃ ┣ 📜 App.tsx
┃ ┣ 📜 main.tsx
┗ 📜 README.md


---

## 🏗️ Installation  

### 1️⃣ Clone the repository

```bash
git clone [https://github.com/your-username/e-commerce-app.git](https://www.google.com/search?q=https://github.com/your-username/e-commerce-app.git)
cd e-commerce-app
2️⃣ Install dependencies
Bash

npm install
3️⃣ Start the development server
Bash

npm run dev
The app should now be running at http://localhost:5173/ 🚀

⚡ API Integration
This project fetches product data from the FakeStore API:

All Products: https://api.escuelajs.co/api/v1/products
Category-based: https://api.escuelajs.co/api/v1/categories/{category_id}
🎨 UI Preview
[Home Page Screenshot]

[Product Details Screenshot]

[Cart Screenshot]

📌 TODO / Future Improvements
🛒 Add authentication for users

💳 Integrate a real payment gateway

⭐ Wishlist feature

📝 User reviews & ratings

🤝 Contributing
Feel free to fork this repo and submit a pull request if you'd like to improve it!