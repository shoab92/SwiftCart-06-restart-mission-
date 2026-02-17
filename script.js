// Navigation function to switch between pages
function navigateTo(page) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));
    
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
}

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

    categories.forEach(category => {
        const btnDiv = document.createElement('div');
        // DaisyUI / Tailwind স্টাইলের সাথে মিলিয়ে বাটন
        btnDiv.innerHTML = `
            <button class="btn btn-primary category-btn" 
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