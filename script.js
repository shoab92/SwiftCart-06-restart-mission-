// Navigation function to switch between pages
function navigateTo(page) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));
    
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
}

loadAllProducts();
// Home page default on load + categories load করা
document.addEventListener('DOMContentLoaded', function() {
    // Home page visible by default
    const homePage = document.getElementById('home-page');
    if (homePage) {
        homePage.classList.remove('hidden');
    }

    // Products page-এ গেলে categories লোড করতে চাইলে এখানে না দিয়ে নিচের ফাংশন ব্যবহার করা যায়
    // loadCategories();   ← এখানে না দিয়ে navigateTo-এর ভিতরে products চেক করবো
});

function loadAllProducts() {
    const url = 'https://fakestoreapi.com/products';
    
    fetch(url)
        .then(res => res.json())
        .then(products => {
            displayProducts(products);     // ← তোমার নিজের displayProducts ফাংশন কল করবে
        })
        .catch(err => {
            console.error("All products load করতে সমস্যা:", err);
            // চাইলে এখানে ইউজারকে একটা মেসেজ দেখাতে পারো
        });
}
function displayProducts(products) {
    const container = document.getElementById('products-list');
    if (!container) {
        console.error("products-list খুঁজে পাওয়া যায়নি");
        return;
    }

    if (!products || products.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-600">No products found</p>';
        return;
    }

    container.innerHTML = ''; // পুরানো কার্ড মুছে ফেলা

    products.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = `
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <figure class="px-6 pt-6">
            <img src="${product.image}" 
                 alt="${product.title}" 
                 class="rounded-xl h-48 w-full object-contain" />
        </figure>
        <div class="card-body pt-4">
            <h2 class="card-title text-base line-clamp-2">
                ${product.title}
            </h2>
            <div class="flex justify-between items-center text-sm opacity-80 mb-2">
                <span class="badge badge-sm bg-blue-100 capitalize">
                    ${product.category}
                </span>
                <div class="flex items-center gap-1">
                    <span class="font-medium">${product.rating.rate.toFixed(1)}</span>
                    <span class="text-yellow-500">★</span>
                    <span class="text-gray-500 text-xs">(${product.rating.count})</span>
                </div>
            </div>

            <p class="text-sm text-gray-600 mb-2">
                ${product.description ? product.description.substring(0, 60) + '...' : 'No description'}
            </p>
            <p class="text-xl font-bold text-primary mt-2">
                $${parseFloat(product.price).toFixed(2)}
            </p>
            <div class="card-actions justify-between mt-4">
                <button class="btn btn-sm "><i class="fa-regular fa-eye"></i> Details</button>
                <button class="btn btn-sm btn-primary">Add to Cart</button>
            </div>
        </div>
    </div>
`;


        container.appendChild(card);
    });
}
function loadProductsByCategory(category) {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    
    fetch(url)
        .then(res => res.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(err => {
            console.error(`Category ${category} load error:`, err);
            // অপশনাল: container.innerHTML = '<p class="text-center text-red-500">Failed to load products</p>';
        });
}



// ক্যাটাগরি লোড করার ফাংশন
const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => displayCategories(categories))
        .catch(err => console.error("Categories load error:", err));
};

// ক্যাটাগরি দেখানো
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    if (!categoriesContainer) {
        console.error("categories-container ID পাওয়া যায়নি");
        return;
    }

    categoriesContainer.innerHTML = ''; // পুরানো কন্টেন্ট ক্লিয়ার
    // Arrange buttons in a centered flex row
    categoriesContainer.classList.add('flex', 'flex-wrap', 'justify-center', 'items-center', 'gap-5');

    const allBtnDiv = document.createElement('div');
    allBtnDiv.innerHTML = `
        <button class="btn category-btn rounded-full" 
                data-category="all">
            All
        </button>
    `;
    categoriesContainer.appendChild(allBtnDiv);

    categories.forEach(category => {
        const btnDiv = document.createElement('div');
        // DaisyUI / Tailwind স্টাইলের সাথে মিলিয়ে বাটন
        btnDiv.innerHTML = `
            <button class="btn category-btn rounded-full text-center" 
                    data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `;
        categoriesContainer.appendChild(btnDiv);
    });
};
// যখনই Products পেজে যাবে → categories লোড করবে (একবার লোড হলেই হবে)
function navigateTo(page) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));
    
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');

        // Products page-এ গেলে categories লোড (প্রথমবার)
        if (page === 'products') {
            if (!document.querySelector('.category-btn')) { // ইতিমধ্যে লোড হয়নি চেক
                loadCategories();
            }
        }
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('category-btn')) {
        const category = e.target.dataset.category;

        // সব বাটন থেকে active সরাও
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('btn-active', 'btn-primary');
        });

        // ক্লিক করা বাটন active করো
        e.target.classList.add('btn-active', 'btn-primary');

        if (category === 'all') {
            loadAllProducts();
        } else {
            loadProductsByCategory(category);
        }
    }
});