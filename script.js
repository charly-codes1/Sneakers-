let cart = [];
let itemPrice = 125.00;
let currentImageIndex = 0; // Ensure this is defined at a higher scope

function toggleCart() {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown.classList.toggle('hidden');
}

document.querySelector('.add-to-cart').addEventListener('click', addToCart);

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').innerText);
    if (quantity > 0) {
        cart.push({ name: 'Fall Limited Edition Sneakers', price: itemPrice, quantity });
        updateCartDisplay();
        updateCartCount();
        alert(`Added ${quantity} item(s) to cart!`);
    }
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`;
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalQuantity;
    cartCount.classList.toggle('hidden', totalQuantity === 0); // Hide if no items
}

const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const quantityInput = document.getElementById('quantity');

increaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.innerText, 10);
    quantityInput.innerText = currentQuantity + 1;
});

decreaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.innerText, 10);
    if (currentQuantity > 0) {
        quantityInput.innerText = currentQuantity - 1;
    }
});

// Image Carousel Variables
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-image');
const carouselModal = document.getElementById('carousel-modal');
const carouselImage = document.getElementById('carousel-image');
const closeCarousel = document.getElementById('close-carousel');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Image sources
// Image sources for the main images
const images = [
    "images/image-product-1.jpg", // Main images, not thumbnails
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
];

// Function to set the main image
function setBackgroundImage(index) {
    mainImage.src = images[index]; // Updates the main image
    currentImageIndex = index; // Update the global index for navigation
    setActiveThumbnail(thumbnails, index); // Highlight the selected thumbnail
}

// Event Listeners for Thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        setBackgroundImage(index);
    });
});

// Helper function to highlight active thumbnail
function setActiveThumbnail(thumbnails, activeIndex) {
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === activeIndex);
    });
}


// Event Listeners for Lightbox
mainImage.addEventListener('click', () => openCarousel(currentImageIndex));
prevButton.addEventListener('click', () => navigateCarousel(-1));
nextButton.addEventListener('click', () => navigateCarousel(1));
closeCarousel.addEventListener('click', () => carouselModal.classList.add('hidden'));

// Close Modal on Background Click
window.addEventListener('click', (e) => {
    if (e.target === carouselModal) {
        carouselModal.classList.add('hidden');
    }
});