// ==========================================
// VISHWAKARMA CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("vishwakarmaCart")) || [];

const cartCount = document.querySelector(".cart-count");
const addCartButtons = document.querySelectorAll(".add-cart-btn");


// ==========================================
// UPDATE NAVBAR CART COUNT
// ==========================================

function updateCartCount() {

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "vishwakarmaCart",
        JSON.stringify(cart)
    );
}


// ==========================================
// NOTIFICATION
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
// ADD TO CART
// ==========================================

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {

        existingProduct.quantity++;

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

    saveCart();
    updateCartCount();
}


// ==========================================
// PRODUCT BUTTONS
// ==========================================

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const product = {

            name: productCard.querySelector("h3").textContent,

            price: productCard
                .querySelector(".price-row strong")
                .textContent,

            category: productCard
                .querySelector(".product-category")
                .textContent,

            icon: productCard
                .querySelector(".product-placeholder")
                .textContent
        };

        addToCart(product);

    });

});


// ==========================================
// CART PAGE
// ==========================================

const cartContainer = document.querySelector("#cart-container");

if (cartContainer) {
    renderCart();
}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <a
                    href="index.html#products"
                    class="empty-cart-btn"
                >
                    Start Shopping →
                </a>

            </div>

        `;

        updateCartSummary();

        return;
    }


    cart.forEach((product, index) => {

        const price = parsePrice(product.price);

        const itemTotal = price * product.quantity;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div class="cart-item-image">
                ${product.icon || "🛍️"}
            </div>

            <div class="cart-item-info">

                <span class="cart-item-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <span class="cart-item-price">
                    ${product.price}
                </span>

                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <span class="cart-item-total">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </span>

                <button
                    class="remove-item"
                    type="button"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;

        cartContainer.appendChild(item);

    });


    updateCartSummary();
}


// ==========================================
// CONVERT PRICE
// ==========================================

function parsePrice(price) {

    return Number(
        price.replace(/[₹,]/g, "")
    );

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    renderCart();

    updateCartCount();
}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();

    renderCart();

    updateCartCount();
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();

    updateCartCount();
}


// ==========================================
// CART SUMMARY
// ==========================================

function updateCartSummary() {

    const subtotalElement =
        document.querySelector("#cart-subtotal");

    const deliveryElement =
        document.querySelector("#cart-delivery");

    const totalElement =
        document.querySelector("#cart-total");

    const itemsCountElement =
        document.querySelector("#cart-items-count");


    if (!subtotalElement) return;


    const totalItems = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );


    const subtotal = cart.reduce(
        (total, product) => {

            const price = parsePrice(product.price);

            return total + price * product.quantity;

        },
        0
    );


    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 999
                ? 0
                : 49;


    const total = subtotal + delivery;


    subtotalElement.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

    deliveryElement.textContent =
        delivery === 0
            ? "FREE"
            : `₹${delivery}`;

    totalElement.textContent =
        `₹${total.toLocaleString("en-IN")}`;


    if (itemsCountElement) {

        itemsCountElement.textContent =
            `${totalItems} ${totalItems === 1 ? "item" : "items"}`;

    }
}


// ==========================================
// INITIALIZE
// ==========================================

updateCartCount();

// ==========================================
// PRODUCT DETAILS PAGE
// ==========================================

const productQuantity = document.querySelector("#product-quantity");
const increaseProduct = document.querySelector("#increase-product");
const decreaseProduct = document.querySelector("#decrease-product");
const productAddCart = document.querySelector("#product-add-cart");

let selectedQuantity = 1;


// ==========================================
// INCREASE PRODUCT QUANTITY
// ==========================================

if (increaseProduct) {

    increaseProduct.addEventListener("click", () => {

        selectedQuantity++;

        productQuantity.textContent = selectedQuantity;

    });

}


// ==========================================
// DECREASE PRODUCT QUANTITY
// ==========================================

if (decreaseProduct) {

    decreaseProduct.addEventListener("click", () => {

        if (selectedQuantity > 1) {

            selectedQuantity--;

            productQuantity.textContent = selectedQuantity;

        }

    });

}


// ==========================================
// ADD PRODUCT DETAILS TO CART
// ==========================================

if (productAddCart) {

    productAddCart.addEventListener("click", () => {

        const product = {

            name: "Wireless Headphones",

            price: "₹1,999",

            category: "Electronics",

            icon: "🎧"

        };


        const existingProduct = cart.find(
            item => item.name === product.name
        );


        if (existingProduct) {

            existingProduct.quantity += selectedQuantity;

        } else {

            cart.push({

                ...product,

                quantity: selectedQuantity

            });

        }


        saveCart();

        updateCartCount();

        showNotification(
            `${selectedQuantity} × ${product.name} added to cart 🛒`
        );

    });

}