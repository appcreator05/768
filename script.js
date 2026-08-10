const castDomain = 'https://raw.githubusercontent.com/appcreator05/768/main/cu12/';
const fallbackUrl = 'https://raw.githubusercontent.com/appcreator05/768/main/cu12/';

// IntersectionObserver তৈরি করা যা স্ক্রিনে আসলে কাজ করবে
const observerOptions = {
    root: null, // ব্রাউজারের ভিউপোর্ট ব্যবহার করা হবে
    rootMargin: '0px',
    threshold: 0.1 // এলিমেন্টটির ১০% স্ক্রিনে দৃশ্যমান হলেই ট্রিগার হবে
};

const loadCastEmbed = (el) => {
    const path = el.getAttribute('data-path');
    if (path && path !== '/placeholder.jpg') {
        el.src = castDomain + path;
    } else {
        el.src = fallbackUrl;
    }
    // লোড হয়ে যাওয়ার পর অবজার্ভ করা বন্ধ করে দেওয়া
    el.classList.remove('cast-embed');
};

const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadCastEmbed(entry.target);
            observerInstance.unobserve(entry.target); // বারবার লোড হওয়া রোধ করতে
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cast-embed').forEach(el => {
        observer.observe(el); // প্রতিটি এলিমেন্টকে ট্র্যাক করার জন্য অবজারভারে যুক্ত করা হলো
    });
});