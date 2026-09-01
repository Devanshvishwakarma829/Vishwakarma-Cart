// Vishwakarma Cart
// JavaScript functionality will be added step-by-step.


// ==========================================
// VISHWAKARMA CART
// Shopping Cart Functionality
// ==========================================

let cart = JSON.parse(localStorage.getItem("vishwakarmaCart")) || [];

const cartCount = document.querySelector(".cart-count");
const addCartButtons = document.querySelectorAll(".add-cart-btn");

// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {
    const totalItems = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}


// ==========================================
// SHOW NOTIFICATION
// ==========================================

function showNotification(message) {

    const notification = document.createElement("div");

    notification.className = "cart-notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2000);
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

        showNotification(
            `${product.name} quantity increased`
        );

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

        showNotification(
            `${product.name} added to cart 🛒`
        );
    }

    localStorage.setItem(
        "vishwakarmaCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// ==========================================
// PRODUCT BUTTON EVENTS
// ==========================================

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const product = {

            name: productCard.querySelector("h3").textContent,

            price: productCard
                .querySelector(".price-row strong")
                .textContent,

            category: productCard
                .querySelector(".product-category")
                .textContent
        };

        addToCart(product);

    });

});


// ==========================================
// INITIALIZE
// ==========================================

updateCartCount();