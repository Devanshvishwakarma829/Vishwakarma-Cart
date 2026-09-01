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

    name: currentProduct.name,

    price: currentProduct.price,

    category: currentProduct.category,

    icon: currentProduct.icon

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

// ==========================================
// DYNAMIC PRODUCT DATA
// ==========================================

const products = {

    headphones: {
        name: "Wireless Headphones",
        category: "ELECTRONICS",
        price: "₹1,999",
        oldPrice: "₹2,499",
        discount: "20% OFF",
        saving: "Save ₹500",
        rating: "4.8",
        reviews: "128 reviews",
        icon: "🎧",
        description:
            "Enjoy an immersive audio experience with comfortable wireless headphones designed for everyday listening, entertainment and work."
    },

    watch: {
        name: "Smart Watch",
        category: "ELECTRONICS",
        price: "₹2,999",
        oldPrice: "₹3,499",
        discount: "15% OFF",
        saving: "Save ₹500",
        rating: "4.7",
        reviews: "94 reviews",
        icon: "⌚",
        description:
            "Stay connected with a stylish smart watch featuring useful everyday features, notifications and activity tracking."
    },

    sneakers: {
        name: "Everyday Sneakers",
        category: "FASHION",
        price: "₹1,499",
        oldPrice: "₹1,999",
        discount: "25% OFF",
        saving: "Save ₹500",
        rating: "4.9",
        reviews: "216 reviews",
        icon: "👟",
        description:
            "Comfortable everyday sneakers designed for casual outings, daily activities and a modern streetwear look."
    },

    backpack: {
        name: "Urban Backpack",
        category: "FASHION",
        price: "₹1,299",
        oldPrice: "₹1,599",
        discount: "18% OFF",
        saving: "Save ₹300",
        rating: "4.6",
        reviews: "76 reviews",
        icon: "🎒",
        description:
            "A practical urban backpack with a clean design, spacious storage and everyday convenience."
    }

};


// ==========================================
// GET PRODUCT FROM URL
// ==========================================

const productId =
    new URLSearchParams(window.location.search).get("id");

const currentProduct = products[productId];


// ==========================================
// UPDATE PRODUCT DETAILS PAGE
// ==========================================

if (currentProduct) {

    const productName =
        document.querySelector(".product-details-info h1");

    const category =
        document.querySelector(".detail-category");

    const price =
        document.querySelector(".detail-price strong");

    const oldPrice =
        document.querySelector(".detail-price del");

    const discount =
        document.querySelector(".detail-price span");

    const description =
        document.querySelector(".product-description");

    const rating =
        document.querySelector(".detail-rating span:nth-child(2)");

    const reviews =
        document.querySelector(".review-count");

    const productIcon =
        document.querySelector(".product-detail-icon");

    const discountBadge =
        document.querySelector(".detail-discount");


    if (productName)
        productName.textContent = currentProduct.name;

    if (category)
        category.textContent = currentProduct.category;

    if (price)
        price.textContent = currentProduct.price;

    if (oldPrice)
        oldPrice.textContent = currentProduct.oldPrice;

    if (discount)
        discount.textContent = currentProduct.saving;

    if (description)
        description.textContent = currentProduct.description;

    if (rating)
        rating.textContent = currentProduct.rating;

    if (reviews)
        reviews.textContent =
            `(${currentProduct.reviews})`;

    if (productIcon)
        productIcon.textContent = currentProduct.icon;

    if (discountBadge)
        discountBadge.textContent = currentProduct.discount;


    document.title =
        `${currentProduct.name} | Vishwakarma Cart`;
}

// ==========================================
// PRODUCT SEARCH
// ==========================================

const searchInput = document.querySelector("#product-search");
const searchButton = document.querySelector("#search-button");
const productCards = document.querySelectorAll(".product-card");

function searchProducts() {

    if (!searchInput) return;

    const searchText =
        searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {

        const productName =
            card.querySelector("h3").textContent.toLowerCase();

        const productCategory =
            card.querySelector(".product-category").textContent.toLowerCase();

        const matches =
            productName.includes(searchText) ||
            productCategory.includes(searchText);

        card.style.display = matches ? "" : "none";
    });
}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}

// ==========================================
// CATEGORY FILTERING
// ==========================================

const categoryCards =
    document.querySelectorAll(".category-card");

const allProductCards =
    document.querySelectorAll(".product-card");


categoryCards.forEach(categoryCard => {

    categoryCard.addEventListener("click", event => {

        event.preventDefault();

        const selectedCategory =
            categoryCard.dataset.category;

        allProductCards.forEach(productCard => {

            const productCategory =
                productCard
                    .querySelector(".product-category")
                    .textContent
                    .trim()
                    .toLowerCase();

            if (selectedCategory === "all") {

                productCard.style.display = "";

            } else if (productCategory === selectedCategory) {

                productCard.style.display = "";

            } else {

                productCard.style.display = "none";
            }

        });

        document
            .querySelector("#products")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});

// ==========================================
// WISHLIST
// ==========================================

let wishlist =
    JSON.parse(localStorage.getItem("vishwakarmaWishlist")) || [];

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");


function saveWishlist() {

    localStorage.setItem(
        "vishwakarmaWishlist",
        JSON.stringify(wishlist)
    );

}


wishlistButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        const productCard =
            button.closest(".product-card");

        if (!productCard) return;


        const productName =
            productCard.querySelector("h3").textContent.trim();

        const productPrice =
            productCard
                .querySelector(".price-row strong")
                .textContent.trim();

        const productCategory =
            productCard
                .querySelector(".product-category")
                .textContent.trim();

        const productIcon =
            productCard
                .querySelector(".product-placeholder")
                .textContent.trim();


        const existingProduct =
            wishlist.find(
                item => item.name === productName
            );


        if (existingProduct) {

            wishlist = wishlist.filter(
                item => item.name !== productName
            );

            button.textContent = "♡";

            showNotification(
                `${productName} removed from wishlist`
            );

        } else {

            wishlist.push({

                name: productName,
                price: productPrice,
                category: productCategory,
                icon: productIcon

            });

            button.textContent = "♥";

            showNotification(
                `${productName} added to wishlist ❤️`
            );

        }


        saveWishlist();

    });

});

// ==========================================
// WISHLIST PAGE
// ==========================================

const wishlistContainer =
    document.querySelector("#wishlist-container");


if (wishlistContainer) {

    renderWishlist();

}


// ==========================================
// RENDER WISHLIST
// ==========================================

function renderWishlist() {

    wishlistContainer.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="empty-wishlist">

                <div class="empty-wishlist-icon">
                    ♡
                </div>

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Save products you love and find them here later.
                </p>

                <a
                    href="index.html#products"
                    class="empty-wishlist-btn"
                >
                    Explore Products →
                </a>

            </div>

        `;

        return;
    }


    wishlist.forEach((product, index) => {

        const item =
            document.createElement("article");

        item.className = "wishlist-item";


        item.innerHTML = `

            <div class="wishlist-item-image">

                <span class="wishlist-item-icon">
                    ${product.icon || "🛍️"}
                </span>

            </div>


            <div class="wishlist-item-content">

                <span class="wishlist-item-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <span class="wishlist-item-price">
                    ${product.price}
                </span>


                <div class="wishlist-actions">

                    <button
                        class="move-cart-btn"
                        type="button"
                        onclick="moveWishlistToCart(${index})"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        class="remove-wishlist-btn"
                        type="button"
                        onclick="removeFromWishlist(${index})"
                        aria-label="Remove from wishlist"
                    >
                        🗑️
                    </button>

                </div>

            </div>

        `;


        wishlistContainer.appendChild(item);

    });

}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(index) {

    const productName =
        wishlist[index].name;

    wishlist.splice(index, 1);

    saveWishlist();

    renderWishlist();

    showNotification(
        `${productName} removed from wishlist`
    );

}


// ==========================================
// MOVE WISHLIST PRODUCT TO CART
// ==========================================

function moveWishlistToCart(index) {

    const product = wishlist[index];


    const existingProduct =
        cart.find(
            item => item.name === product.name
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showNotification(
        `${product.name} added to cart 🛒`
    );

}

// ==========================================
// PRODUCT DETAILS WISHLIST
// ==========================================

const detailWishlistButton =
    document.querySelector("#detail-wishlist-btn");

if (detailWishlistButton && currentProduct) {

    const isAlreadyWishlisted =
        wishlist.some(
            item => item.name === currentProduct.name
        );

    if (isAlreadyWishlisted) {
        detailWishlistButton.textContent = "♥";
        detailWishlistButton.classList.add("active");
    }


    detailWishlistButton.addEventListener("click", () => {

        const existingProduct =
            wishlist.find(
                item => item.name === currentProduct.name
            );


        if (existingProduct) {

            wishlist = wishlist.filter(
                item => item.name !== currentProduct.name
            );

            detailWishlistButton.textContent = "♡";
            detailWishlistButton.classList.remove("active");

            showNotification(
                `${currentProduct.name} removed from wishlist`
            );

        } else {

            wishlist.push({

                name: currentProduct.name,
                price: currentProduct.price,
                category: currentProduct.category,
                icon: currentProduct.icon

            });

            detailWishlistButton.textContent = "♥";
            detailWishlistButton.classList.add("active");

            showNotification(
                `${currentProduct.name} added to wishlist ❤️`
            );

        }

        saveWishlist();

    });

}

// ==========================================
// SYNC WISHLIST BUTTONS
// ==========================================

function syncWishlistButtons() {

    const buttons =
        document.querySelectorAll(".wishlist-btn");

    buttons.forEach(button => {

        const productCard =
            button.closest(".product-card");

        if (!productCard) return;

        const productName =
            productCard
                .querySelector("h3")
                .textContent
                .trim();

        const isWishlisted =
            wishlist.some(
                item => item.name === productName
            );

        if (isWishlisted) {

            button.textContent = "♥";
            button.classList.add("active");

        } else {

            button.textContent = "♡";
            button.classList.remove("active");

        }

    });

}


// Run when page loads
syncWishlistButtons();

// ==========================================
// CHECKOUT PAGE
// ==========================================

const checkoutItems = document.querySelector("#checkout-items");
const checkoutSubtotal = document.querySelector("#checkout-subtotal");
const checkoutDelivery = document.querySelector("#checkout-delivery");
const checkoutTotal = document.querySelector("#checkout-total");

if (checkoutItems) {
    renderCheckout();
}

function renderCheckout() {
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="empty-checkout">
                <p>Your cart is empty.</p>
                <a href="index.html#products">Continue Shopping →</a>
            </div>
        `;

        if (checkoutSubtotal) checkoutSubtotal.textContent = "₹0";
        if (checkoutDelivery) checkoutDelivery.textContent = "₹0";
        if (checkoutTotal) checkoutTotal.textContent = "₹0";

        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const price = parsePrice(item.price);
        const itemTotal = price * item.quantity;

        subtotal += itemTotal;

        const checkoutItem = document.createElement("div");
        checkoutItem.className = "checkout-item";

        checkoutItem.innerHTML = `
            <div class="checkout-item-icon">
                ${item.icon || "🛍️"}
            </div>

            <div class="checkout-item-info">
                <h3>${item.name}</h3>
                <span>Qty: ${item.quantity}</span>
            </div>

            <div class="checkout-item-total">
                ₹${itemTotal.toLocaleString("en-IN")}
            </div>
        `;

        checkoutItems.appendChild(checkoutItem);
    });

    const delivery = subtotal >= 999 ? 0 : 49;
    const total = subtotal + delivery;

    checkoutSubtotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

    checkoutDelivery.textContent =
        delivery === 0
            ? "FREE"
            : `₹${delivery}`;

    checkoutTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}

// ==========================================
// PLACE ORDER
// ==========================================

const checkoutForm = document.querySelector("#checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (cart.length === 0) {
            showNotification("Your cart is empty 🛒");
            return;
        }

        const paymentMethod =
            document.querySelector('input[name="payment"]:checked');

        if (!paymentMethod) {
            showNotification("Please select a payment method");
            return;
        }

        showNotification("Order placed successfully 🎉");

        localStorage.removeItem("vishwakarmaCart");
        cart = [];

        updateCartCount();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    });
}