// =====================================================
// FOODHUB - MAIN JAVASCRIPT
// =====================================================

// =====================================================
// FOOD DATA
// =====================================================

const foods = {

    burger: {
        name: "Chicken Burger",
        category: "Burger",
        price: 150,
        image: "../images/food/Burger.jpg",
        description:
            "Juicy chicken burger with fresh vegetables and delicious sauce."
    },

    pizza: {
        name: "Cheese Pizza",
        category: "Pizza",
        price: 250,
        image: "../images/food/Pizza.jpg",
        description:
            "Hot and cheesy pizza topped with fresh ingredients."
    },

    biryani: {
        name: "Chicken Biryani",
        category: "Biryani",
        price: 180,
        image: "../images/food/Biryani.jpg",
        description:
            "Aromatic basmati rice cooked with tender chicken and spices."
    },

    pasta: {
        name: "Creamy Pasta",
        category: "Pasta",
        price: 200,
        image: "../images/food/Pasta.jpg",
        description:
            "Creamy pasta prepared with herbs and delicious sauce."
    },

    fries: {
        name: "French Fries",
        category: "Snacks",
        price: 100,
        image: "../images/food/Fries.jpg",
        description:
            "Crispy golden fries served with delicious dipping sauce."
    },

    shawarma: {
        name: "Chicken Shawarma",
        category: "Shawarma",
        price: 160,
        image: "../images/food/Shawarma.jpg",
        description:
            "Tender chicken wrapped with fresh vegetables and creamy sauce."
    },

    sandwich: {
        name: "Club Sandwich",
        category: "Sandwich",
        price: 140,
        image: "../images/food/Sandwich.jpg",
        description:
            "Fresh sandwich layered with vegetables, cheese and tasty fillings."
    },

    friedrice: {
        name: "Chicken Fried Rice",
        category: "Rice",
        price: 170,
        image: "../images/food/Rice.jpg",
        description:
            "Flavorful fried rice cooked with chicken, vegetables and special spices."
    }

};


// ==============================
// FOODHUB TOAST
// ==============================

function showToast(message) {

    const toastElement =
        document.getElementById("foodhubToast");

    const toastMessage =
        document.getElementById("foodhubToastMessage");

    if (!toastElement || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    const toast =
        bootstrap.Toast.getOrCreateInstance(
            toastElement,
            {
                delay: 2500
            }
        );

    toast.show();
}

// =====================================================
// CART DATA
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("foodhubCart")) || [];


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "foodhubCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// CART BADGE
// =====================================================

function updateCartBadge() {

    const badges =
        document.querySelectorAll(".navbar .badge");

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });

    badges.forEach(function (badge) {

        badge.textContent = totalQuantity;

    });

}


// =====================================================
// UPDATE BADGE WHEN PAGE LOADS
// =====================================================

updateCartBadge();


// =====================================================
// HOME PAGE - ADD TO CART
// =====================================================

const homeAddCartButtons =
    document.querySelectorAll(".home-add-cart");


homeAddCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const foodId =
            button.getAttribute("data-food");

        const selectedFood =
            foods[foodId];

        if (!selectedFood) {

            console.error("Food not found:", foodId);

            return;

        }


        const existingItem =
            cart.find(function (item) {

                return item.id === foodId;

            });


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({

                id: foodId,
                name: selectedFood.name,
                price: selectedFood.price,
                image: selectedFood.image,
                quantity: 1

            });

        }


        saveCart();

        updateCartBadge();

        showToast("Added to cart");

    });

});


// =====================================================
// FOOD DETAILS PAGE
// =====================================================

// Get food ID from URL

const params =
    new URLSearchParams(window.location.search);

let foodId =
    params.get("food");


// Default food

if (!foodId) {

    foodId = "burger";

}


const selectedFood =
    foods[foodId];


// Food detail elements

const foodImage =
    document.getElementById("foodImage");

const foodCategory =
    document.getElementById("foodCategory");

const foodName =
    document.getElementById("foodName");

const foodDescription =
    document.getElementById("foodDescription");

const foodPrice =
    document.getElementById("foodPrice");

const foodTotal =
    document.getElementById("foodTotal");

const quantityElement =
    document.getElementById("quantity");

const increaseBtn =
    document.getElementById("increaseBtn");

const decreaseBtn =
    document.getElementById("decreaseBtn");

const addToCartBtn =
    document.getElementById("addToCartBtn");


// Quantity

let quantity = 1;


// Only run when food details exist

if (
    foodImage &&
    foodCategory &&
    foodName &&
    foodDescription &&
    foodPrice &&
    foodTotal &&
    quantityElement &&
    selectedFood
) {

    // Display image

    foodImage.src =
        selectedFood.image;


    // Display category

    foodCategory.textContent =
        selectedFood.category;


    // Display name

    foodName.textContent =
        selectedFood.name;


    // Display description

    foodDescription.textContent =
        selectedFood.description;


    // Display price

    foodPrice.textContent =
        selectedFood.price;


    // Display total

    foodTotal.textContent =
        selectedFood.price * quantity;


    // Increase quantity

    if (increaseBtn) {

        increaseBtn.addEventListener(
            "click",
            function () {

                quantity += 1;

                quantityElement.textContent =
                    quantity;

                foodTotal.textContent =
                    selectedFood.price * quantity;

            }
        );

    }


    // Decrease quantity

    if (decreaseBtn) {

        decreaseBtn.addEventListener(
            "click",
            function () {

                if (quantity > 1) {

                    quantity -= 1;

                }

                quantityElement.textContent =
                    quantity;

                foodTotal.textContent =
                    selectedFood.price * quantity;

            }
        );

    }


    // Add food details to cart

    if (addToCartBtn) {

        addToCartBtn.addEventListener(
            "click",
            function () {

                const existingItem =
                    cart.find(function (item) {

                        return item.id === foodId;

                    });


                if (existingItem) {

                    existingItem.quantity +=
                        quantity;

                } else {

                    cart.push({

                        id: foodId,
                        name: selectedFood.name,
                        price: selectedFood.price,
                        image: selectedFood.image,
                        quantity: quantity

                    });

                }


                saveCart();

                updateCartBadge();



// Show Bootstrap toast
const foodDetailToast =
    document.getElementById("foodDetailToast");

const foodDetailToastMessage =
    document.getElementById("foodDetailToastMessage");

if (foodDetailToast && foodDetailToastMessage) {

    foodDetailToastMessage.textContent =
        selectedFood.name + " added to cart";

    const toast =
        bootstrap.Toast.getOrCreateInstance(
            foodDetailToast,
            {
                delay: 2500
            }
        );

    toast.show();
}


            }
        );

    }

}


// =====================================================
// CART PAGE
// =====================================================

const cartItemsContainer =
    document.getElementById("cartItems");

const cartTotalElement =
    document.getElementById("cartTotal");

const deliveryFeeElement =
    document.getElementById("deliveryFee");

const finalTotalElement =
    document.getElementById("finalTotal");


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    if (!cartItemsContainer) {

        return;

    }


    cartItemsContainer.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="text-center py-5">

                <h3>Your cart is empty 🛒</h3>

                <p class="text-muted">
                    Add some delicious food to your cart.
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary">

                    Browse Food

                </a>

            </div>

        `;

        updateCartTotal();

        return;

    }


    // Display every cart item

    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "card shadow-sm mb-3";


        cartItem.innerHTML = `

            <div class="card-body">

                <div class="row align-items-center">

                    <div class="col-12 col-md-2 text-center">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="img-fluid rounded"
                            style="height:100px;width:120px;object-fit:cover;">

                    </div>


                    <div class="col-12 col-md-3 mt-3 mt-md-0">

                        <h5 class="mb-1">
                            ${item.name}
                        </h5>

                        <p class="text-muted mb-0">
                            ₹${item.price} each
                        </p>

                    </div>


                    <div class="col-12 col-md-3 mt-3 mt-md-0">

                        <div class="d-flex align-items-center justify-content-center gap-2">

                            <button
                                class="btn btn-outline-danger decrease-btn"
                                data-id="${item.id}">

                                −

                            </button>


                            <span class="fw-bold">

                                ${item.quantity}

                            </span>


                            <button
                                class="btn btn-outline-success increase-btn"
                                data-id="${item.id}">

                                +

                            </button>

                        </div>

                    </div>


                    <div class="col-12 col-md-2 text-center mt-3 mt-md-0">

                        <strong>
                            ₹${itemTotal}
                        </strong>

                    </div>


                    <div class="col-12 col-md-2 text-center mt-3 mt-md-0">

                        <button
                            class="btn btn-danger remove-btn"
                            data-id="${item.id}">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    updateCartTotal();

}


// =====================================================
// UPDATE CART TOTAL
// =====================================================

function updateCartTotal() {

    if (
        !cartTotalElement ||
        !deliveryFeeElement ||
        !finalTotalElement
    ) {

        return;

    }


    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.quantity;

    });


    const deliveryFee =
        cart.length > 0 ? 40 : 0;


    const finalTotal =
        subtotal + deliveryFee;


    cartTotalElement.textContent =
        subtotal;


    deliveryFeeElement.textContent =
        deliveryFee;


    finalTotalElement.textContent =
        finalTotal;

}


// =====================================================
// DISPLAY CART WHEN CART PAGE LOADS
// =====================================================

displayCart();


// =====================================================
// CART + / - BUTTONS
// =====================================================

if (cartItemsContainer) {

    cartItemsContainer.addEventListener(
        "click",
        function (event) {


            // Increase

            if (
                event.target.classList.contains(
                    "increase-btn"
                )
            ) {

                const id =
                    event.target.getAttribute(
                        "data-id"
                    );


                const item =
                    cart.find(function (cartItem) {

                        return cartItem.id === id;

                    });


                if (item) {

                    item.quantity += 1;

                }


                saveCart();

                displayCart();

                updateCartBadge();

            }


            // Decrease

            if (
                event.target.classList.contains(
                    "decrease-btn"
                )
            ) {

                const id =
                    event.target.getAttribute(
                        "data-id"
                    );


                const item =
                    cart.find(function (cartItem) {

                        return cartItem.id === id;

                    });


                if (item) {

                    if (item.quantity > 1) {

                        item.quantity -= 1;

                    }

                }


                saveCart();

                displayCart();

                updateCartBadge();

            }


            // Remove

            if (
                event.target.classList.contains(
                    "remove-btn"
                )
            ) {

                const id =
                    event.target.getAttribute(
                        "data-id"
                    );


                cart =
                    cart.filter(function (item) {

                        return item.id !== id;

                    });


                saveCart();

                displayCart();

                updateCartBadge();

            }

        }
    );

}

// =====================================================
// CLEAR CART
// =====================================================

const clearCartBtn =
    document.getElementById("clearCartBtn");

const clearCartToast =
    document.getElementById("clearCartToast");

const confirmClearCart =
    document.getElementById("confirmClearCart");


if (clearCartBtn) {

    clearCartBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

    const toast =
        bootstrap.Toast.getOrCreateInstance(
            clearCartToast
        );

    const toastBody =
        clearCartToast.querySelector(
            ".toast-body"
        );

    toastBody.innerHTML = `
        <strong>Cart is empty</strong>

        <p class="mb-0 mt-1">
            Your cart is already empty.
        </p>
    `;

    toast.show();

    return;

}


            const toast =
                bootstrap.Toast.getOrCreateInstance(
                    clearCartToast
                );

            toast.show();

        }
    );

}


if (confirmClearCart) {

    confirmClearCart.addEventListener(
        "click",
        function () {

            cart = [];

            saveCart();

            displayCart();

            updateCartBadge();


            const toast =
                bootstrap.Toast.getOrCreateInstance(
                    clearCartToast
                );

            toast.hide();


            showToast(
                "Cart cleared"
            );

        }
    );

}


// =====================================================
// CHECKOUT
// =====================================================

const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutModalElement =
    document.getElementById("checkoutModal");

const orderNowBtn =
    document.getElementById("orderNowBtn");

const emptyCartModalElement =
    document.getElementById("emptyCartModal");


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            // If cart is empty

            if (cart.length === 0) {

                if (
                    emptyCartModalElement &&
                    typeof bootstrap !== "undefined"
                ) {

                    const emptyModal =
                        new bootstrap.Modal(
                            emptyCartModalElement
                        );

                    emptyModal.show();

                } else {

                    alert(
                        "Please add food to your cart first."
                    );

                }

                return;

            }


            // Show checkout modal

            if (
                checkoutModalElement &&
                typeof bootstrap !== "undefined"
            ) {

                const checkoutModal =
                    new bootstrap.Modal(
                        checkoutModalElement
                    );

                checkoutModal.show();

            }

        }
    );

}


// =====================================================
// ORDER NOW
// =====================================================

const orderSuccessModalElement =
    document.getElementById(
        "orderSuccessModal"
    );


if (orderNowBtn) {

    orderNowBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                return;

            }


            // Get previous orders

            let orderHistory =
                JSON.parse(
                    localStorage.getItem(
                        "foodhubOrders"
                    )
                ) || [];


            // Calculate order total

            let subtotal = 0;


            cart.forEach(function (item) {

                subtotal +=
                    item.price * item.quantity;

            });


            const deliveryFee = 40;

            const orderTotal =
                subtotal + deliveryFee;


            // Create order

            const newOrder = {

                id: Date.now(),

                items: cart.map(
                    function (item) {

                        return {

                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image

                        };

                    }
                ),

                orderDate:
                    new Date().toLocaleString(),

                subtotal:
                    subtotal,

                deliveryFee:
                    deliveryFee,

                total:
                    orderTotal

            };


            // Add order

            orderHistory.push(
                newOrder
            );


            // Save orders

            localStorage.setItem(
                "foodhubOrders",
                JSON.stringify(orderHistory)
            );


            // Clear cart

            cart = [];


            saveCart();

            updateCartBadge();


            // Refresh cart if available

            displayCart();


            // Close checkout modal

            if (
                checkoutModalElement &&
                typeof bootstrap !== "undefined"
            ) {

                const checkoutModal =
                    bootstrap.Modal.getInstance(
                        checkoutModalElement
                    );


                if (checkoutModal) {

                    checkoutModal.hide();

                }

            }


            // Show success modal

            if (
                orderSuccessModalElement &&
                typeof bootstrap !== "undefined"
            ) {

                const successModal =
                    new bootstrap.Modal(
                        orderSuccessModalElement
                    );

                successModal.show();


                // Go to orders page after closing

                orderSuccessModalElement.addEventListener(
                    "hidden.bs.modal",
                    function () {

                        window.location.href =
                            "order.html";

                    },
                    {
                        once: true
                    }
                );

            } else {

                alert(
                    "Order placed successfully!"
                );

                window.location.href =
                    "order.html";

            }

        }
    );

}


// =====================================================
// ORDER HISTORY PAGE
// =====================================================

const orderHistoryContainer =
    document.getElementById(
        "orderHistory"
    );


function displayOrderHistory() {

    if (!orderHistoryContainer) {

        return;

    }


    const orderHistory =
        JSON.parse(
            localStorage.getItem(
                "foodhubOrders"
            )
        ) || [];


    orderHistoryContainer.innerHTML = "";


    // No orders

    if (orderHistory.length === 0) {

        orderHistoryContainer.innerHTML = `

            <div class="text-center py-5">

                <h3>
                    No Orders Yet 📦
                </h3>

                <p class="text-muted">
                    Your previous orders will appear here.
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary">

                    Order Food

                </a>

            </div>

        `;

        return;

    }


    // Newest order first

    const reversedOrders =
        [...orderHistory].reverse();


    reversedOrders.forEach(
        function (order) {

            const orderCard =
                document.createElement(
                    "div"
                );


            orderCard.className =
                "card shadow-sm mb-4";


            let itemsHTML = "";


            order.items.forEach(
                function (item) {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    itemsHTML += `

                        <div class="d-flex align-items-center mb-3">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                                class="rounded me-3"
                                style="width:70px;height:70px;object-fit:cover;">

                            <div class="flex-grow-1">

                                <h6 class="mb-1">
                                    ${item.name}
                                </h6>

                                <small class="text-muted">

                                    ₹${item.price}
                                    ×
                                    ${item.quantity}

                                </small>

                            </div>

                            <strong>

                                ₹${itemTotal}

                            </strong>

                        </div>

                    `;

                }
            );


            orderCard.innerHTML = `

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center mb-3">

                        <div>

                            <h5 class="mb-1">
                                Order #${order.id}
                            </h5>

                            <small class="text-muted">

                                ${order.orderDate}

                            </small>

                        </div>


                        <span class="badge bg-success">

                            Delivered

                        </span>

                    </div>


                    <hr>


                    ${itemsHTML}


                    <hr>


                    <div class="d-flex justify-content-between">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹${order.subtotal || order.total}
                        </strong>

                    </div>


                    <div class="d-flex justify-content-between">

                        <span>
                            Delivery Fee
                        </span>

                        <strong>
                            ₹${order.deliveryFee || 0}
                        </strong>

                    </div>


                    <div class="d-flex justify-content-between mt-2">

                        <strong>
                            Total
                        </strong>

                        <strong class="text-success">

                            ₹${order.total}

                        </strong>

                    </div>


                    <div class="text-end mt-3">

                        <button
                            class="btn btn-danger delete-order-btn"
                            data-order-id="${order.id}">

                            Delete Order

                        </button>

                    </div>

                </div>

            `;


            orderHistoryContainer.appendChild(
                orderCard
            );

        }
    );

}


// Display orders

displayOrderHistory();


// =====================================================
// DELETE ORDER
// =====================================================

const deleteOrderToast =
    document.getElementById("deleteOrderToast");

const confirmDeleteOrder =
    document.getElementById("confirmDeleteOrder");

let orderToDelete = null;


// When Delete Order button is clicked
if (orderHistoryContainer) {

    orderHistoryContainer.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.classList.contains(
                    "delete-order-btn"
                )
            ) {
                return;
            }


            // Get selected order ID
            orderToDelete =
                event.target.getAttribute(
                    "data-order-id"
                );


            // Show confirmation toast
            if (
                deleteOrderToast &&
                typeof bootstrap !== "undefined"
            ) {

                const toast =
                    bootstrap.Toast.getOrCreateInstance(
                        deleteOrderToast
                    );

                toast.show();

            }

        }
    );

}


// Confirm Delete button
if (confirmDeleteOrder) {

    confirmDeleteOrder.addEventListener(
        "click",
        function () {

            if (!orderToDelete) {
                return;
            }


            // Get current orders
            let orderHistory =
                JSON.parse(
                    localStorage.getItem(
                        "foodhubOrders"
                    )
                ) || [];


            // Remove selected order
            orderHistory =
                orderHistory.filter(
                    function (order) {

                        return String(order.id) !==
                            String(orderToDelete);

                    }
                );


            // Save updated orders
            localStorage.setItem(
                "foodhubOrders",
                JSON.stringify(orderHistory)
            );


            // Hide confirmation toast
            if (
                deleteOrderToast &&
                typeof bootstrap !== "undefined"
            ) {

                const toast =
                    bootstrap.Toast.getOrCreateInstance(
                        deleteOrderToast
                    );

                toast.hide();

            }


            // Clear selected order
            orderToDelete = null;


            // Refresh order history
            displayOrderHistory();

        }
    );

}


// ==============================
// CONTACT FORM - EMAILJS
// ==============================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    // Initialize EmailJS
    emailjs.init({
        publicKey: "lRKr4Gd5-9Pqyd5vL"
    });


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        if (message === "") {
            alert("Please enter your message.");
            return;
        }


        emailjs.sendForm(
            "service_ul8enp9",
            "template_7unaabp",
            contactForm
        )

        .then(function (response) {

            console.log(
                "Email sent successfully:",
                response.status,
                response.text
            );
    const contactToast =
        document.getElementById("contactToast");
    
    const contactToastMessage =
        document.getElementById("contactToastMessage");
    
    if (contactToast && contactToastMessage) {
    
        contactToastMessage.textContent =
            "Message sent successfully";
    
        const toast =
            bootstrap.Toast.getOrCreateInstance(
                contactToast,
                {
                    delay: 2500
                }
            );
    
        toast.show();
    }
    
                contactForm.reset();
    
            })
    
            .catch(function (error) {
    
                console.error("EmailJS Error:", error);
    
                alert(
                    "Failed to send message. Please try again."
                );
    
            });
    
        });
    
    }