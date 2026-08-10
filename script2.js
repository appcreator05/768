const castDomain = 'https://raw.githubusercontent.com/appcreator05/768/main/cu12/';

// IntersectionObserver তৈরি করা যা স্ক্রিনে আসলে কাজ করবে
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // এলিমেন্টটির ১০% স্ক্রিনে দৃশ্যমান হলেই লোড শুরু হবে
};

const loadCastEmbed = (el) => {
    const path = el.getAttribute('data-path');
    if (path && path !== '/placeholder.jpg') {
        el.src = castDomain + path;
    } else {
        el.src = castDomain; // আপনার আগের লজিক অনুযায়ী ফলব্যাক ইউআরএল
    }
};

const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadCastEmbed(entry.target);
            observerInstance.unobserve(entry.target); // একবার লোড হয়ে গেলে আর ট্র্যাক করবে না
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cast-embed').forEach(el => {
        observer.observe(el); // প্রতিটি ইমেজ স্ক্রিনে আসার জন্য অপেক্ষা করবে
    });
});