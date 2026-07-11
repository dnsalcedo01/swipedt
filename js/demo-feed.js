window.allDemoPosts = [
    {
        id: 1,
        user_id: 101,
        post_hash: 'abc1234',
        username: 'traveler_joe',
        full_name: 'Joe The Explorer',
        avatar_color: '#3b82f6',
        avatar_url: 'https://ui-avatars.com/api/?name=Joe+Explorer&background=3b82f6&color=fff',
        text_content: 'Just reached the summit! The view is absolutely breathtaking. #nature #hiking',
        image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        like_count: 142,
        comment_count: 24,
        recent_liker: 'sarah_p',
        second_liker: 'mike_t',
        user_liked: 0,
        user_saved: 0,
        is_following: 0,
        is_badge_verified: 1
    },
    {
        id: 2,
        user_id: 102,
        post_hash: 'def5678',
        username: 'tech_guru',
        full_name: 'Alex Tech',
        avatar_color: '#ef4444',
        avatar_url: 'https://ui-avatars.com/api/?name=Alex+Tech&background=ef4444&color=fff',
        text_content: 'Working on a new project using the latest web technologies. The future is exciting! 🚀💻',
        image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        like_count: 89,
        comment_count: 12,
        recent_liker: 'dev_jane',
        second_liker: 'code_master',
        user_liked: 1,
        user_saved: 0,
        is_following: 1,
        is_badge_verified: 0
    },
    {
        id: 3,
        user_id: 103,
        post_hash: 'ghi9012',
        username: 'foodie_anna',
        full_name: 'Anna Foodie',
        avatar_color: '#10b981',
        avatar_url: 'https://ui-avatars.com/api/?name=Anna+Foodie&background=10b981&color=fff',
        text_content: 'Morning coffee and aesthetics. Perfect way to start the day. ☕️✨',
        image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        like_count: 534,
        comment_count: 45,
        recent_liker: 'coffee_lover',
        second_liker: null,
        user_liked: 0,
        user_saved: 1,
        is_following: 0,
        is_badge_verified: 1
    },
    {
        id: 4,
        user_id: 104,
        post_hash: 'jkl3456',
        username: 'urban_snaps',
        full_name: 'City Snaps',
        avatar_color: '#f59e0b',
        avatar_url: 'https://ui-avatars.com/api/?name=City+Snaps&background=f59e0b&color=fff',
        text_content: 'The city never sleeps. Catching those golden hour reflections on the glass. 🌆',
        image_url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        like_count: 211,
        comment_count: 31,
        recent_liker: 'traveler_joe',
        second_liker: null,
        user_liked: 0,
        user_saved: 0,
        is_following: 1,
        is_badge_verified: 0
    },
    {
        id: 5,
        user_id: 105,
        post_hash: 'mno7890',
        username: 'pet_pals',
        full_name: 'Happy Pets',
        avatar_color: '#8b5cf6',
        avatar_url: 'https://ui-avatars.com/api/?name=Happy+Pets&background=8b5cf6&color=fff',
        text_content: 'Who can resist this face? 🐶🐾',
        image_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        created_at: new Date(Date.now() - 14400000).toISOString(),
        like_count: 856,
        comment_count: 124,
        recent_liker: 'doggo_fan',
        second_liker: 'cat_lover',
        user_liked: 1,
        user_saved: 1,
        is_following: 0,
        is_badge_verified: 0
    }
];

let preloadedPosts = [];
let activeCard = null;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('single-post-container')) {
        initSinglePost();
    } else {
        initDemoFeed();
    }
});

function initDemoFeed() {
    window.switchFeed('suggested');
}

window.switchFeed = function(type) {
    if (isAnimating) return;
    
    // Update active tab styling
    const suggestedTab = document.getElementById('tab-suggested');
    const followingTab = document.getElementById('tab-following');
    
    if (suggestedTab && followingTab) {
        if (type === 'suggested') {
            suggestedTab.className = "feed-tab text-base font-bold pb-2 border-b-2 border-blue-500 text-slate-800 dark:text-slate-100 transition-colors";
            followingTab.className = "feed-tab text-base font-semibold pb-2 border-b-2 border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors";
        } else {
            followingTab.className = "feed-tab text-base font-bold pb-2 border-b-2 border-blue-500 text-slate-800 dark:text-slate-100 transition-colors";
            suggestedTab.className = "feed-tab text-base font-semibold pb-2 border-b-2 border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors";
        }
    }

    // Filter posts
    preloadedPosts = window.allDemoPosts.filter(p => {
        if (type === 'suggested') return p.is_following === 0;
        return p.is_following === 1;
    }).map(p => ({...p})); // deep copy so we don't mutate original objects directly when swiping

    // Clear feed
    if (activeCard) {
        activeCard.remove();
        activeCard = null;
    }
    document.querySelectorAll('.post-card').forEach(c => c.remove());
    
    const container = document.getElementById('feed-container');
    if (container) {
        const noPostsMsg = document.getElementById('no-posts-message');
        if (noPostsMsg) noPostsMsg.classList.add('hidden');
    }
    
    showNextPost();
};

function showNextPost() {
    if (isAnimating) return;

    if (preloadedPosts.length === 0) {
        document.getElementById('no-posts-message').classList.remove('hidden');
        if (typeof toggleSwipeOverlays === 'function') toggleSwipeOverlays(false);
        return;
    }

    const post = preloadedPosts.shift();
    const card = createPostCard(post);
    document.getElementById('feed-container').appendChild(card);
    activeCard = card;
    
    if (typeof toggleSwipeOverlays === 'function') {
        toggleSwipeOverlays(true);
        // Setup ResizeObserver to track image loading height changes
        if (window.swipeResizeObserver) window.swipeResizeObserver.disconnect();
        window.swipeResizeObserver = new ResizeObserver(() => {
            if (activeCard && !isAnimating) toggleSwipeOverlays(true);
        });
        window.swipeResizeObserver.observe(activeCard);
    }
}

window.toggleSwipeOverlays = function(show) {
    const swipeLeft = document.getElementById('desktop-swipe-left');
    const swipeRight = document.getElementById('desktop-swipe-right');
    if (swipeLeft && swipeRight) {
        if (show) {
            swipeLeft.style.display = '';
            swipeRight.style.display = '';
            
            if (activeCard) {
                const container = document.getElementById('feed-container');
                const cardTop = container.offsetTop + activeCard.offsetTop;
                const cardHeight = activeCard.offsetHeight;
                
                swipeLeft.style.top = cardTop + 'px';
                swipeLeft.style.height = cardHeight + 'px';
                
                swipeRight.style.top = cardTop + 'px';
                swipeRight.style.height = cardHeight + 'px';
            }
        } else {
            swipeLeft.style.display = 'none';
            swipeRight.style.display = 'none';
        }
    }
};

window.addEventListener('resize', () => {
    if (activeCard && !isAnimating) {
        toggleSwipeOverlays(true);
    }
});

function timeSince(dateString) {
    let parsedString = dateString;
    if (!parsedString.includes('T')) parsedString = parsedString.replace(' ', 'T') + 'Z';
    const date = new Date(parsedString);
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds > 3 * 86400) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    let interval = seconds / 86400;
    if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " day ago" : " days ago");
    interval = seconds / 3600;
    if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " hour ago" : " hours ago");
    interval = seconds / 60;
    if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " minute ago" : " minutes ago");

    const s = Math.max(0, Math.floor(seconds));
    return s + (s === 1 ? " second ago" : " seconds ago");
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-300 flex flex-col absolute swipe-card select-none max-h-[calc(100%-1rem)] md:max-h-[calc(100%-2rem)] h-auto';
    card.style.zIndex = 10;

    const displayContent = post.text_content.replace(/(^|\s)#(\w+)/g, '$1<span class="text-blue-500 font-medium">#$2</span>').replace(/(^|\s)@(\w+)/g, '$1<span class="text-blue-500 font-medium">@$2</span>');
    
    const imageHtml = post.image_url ? `
        <div class="px-4 pb-4 flex-1 min-h-[100px] flex flex-col overflow-hidden relative group image-wrapper-target">
            <div class="block w-full h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 cursor-pointer">
                <img src="${post.image_url}" draggable="false" class="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300" alt="Post image">
            </div>
            <i id="big-heart-${post.id}" class="fas fa-heart absolute top-1/2 left-1/2 text-white/90 text-[100px] drop-shadow-2xl pointer-events-none z-50 opacity-0" style="transform: translate(-50%, -50%) scale(0);"></i>
            <i id="big-save-${post.id}" class="fas fa-bookmark absolute top-1/2 left-1/2 text-white/90 text-[100px] drop-shadow-2xl pointer-events-none z-50 opacity-0" style="transform: translate(-50%, -50%) scale(0);"></i>
        </div>` : '';

    const avatarHtml = `<img src="${post.avatar_url}" draggable="false" class="w-10 h-10 shrink-0 rounded-full object-cover shadow" alt="Avatar">`;
    const verifiedBadge = post.is_badge_verified ? '<span class="verified-badge-icon ml-[1px]" oncontextmenu="return false;" title="Verified User"></span>' : '';
    const followBtnHtml = post.is_following 
        ? ` • <button type="button" class="follow-btn-${post.user_id} text-slate-400 hover:text-slate-500 font-bold transition-colors" onclick="window.toggleFollow(event, this, ${post.user_id})">Following</button>`
        : ` • <button type="button" class="follow-btn-${post.user_id} text-blue-500 hover:text-blue-600 font-bold transition-colors" onclick="window.toggleFollow(event, this, ${post.user_id})">Follow</button>`;

    card.innerHTML = `
        <div class="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
            <div class="flex items-center space-x-3">
                <a href="#" onclick="alert('Demo: Profile disabled')" class="flex items-center space-x-3 hover:opacity-90 transition">
                    ${avatarHtml}
                    <div class="flex flex-col text-left">
                        <span class="font-bold text-sm leading-tight text-slate-800 dark:text-slate-100 hover:underline">${post.full_name}${verifiedBadge}</span>
                        <span class="text-xs text-slate-400">@${post.username}${followBtnHtml} • ${timeSince(post.created_at)}</span>
                    </div>
                </a>
            </div>
            <div class="relative">
                <button onclick="alert('Demo: Options disabled')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        </div>
        <div class="flex-1 overflow-y-auto min-h-0 flex flex-col cursor-pointer">
            <div class="px-4 pt-4 pb-2 text-slate-800 dark:text-slate-200 break-words leading-relaxed text-sm shrink-0 block hover:opacity-90 transition">
                ${displayContent}
            </div>
            ${imageHtml}
            <div class="px-4 pb-3 pt-0 text-xs text-slate-500 font-medium ${post.like_count > 0 ? '' : 'hidden'} hover:opacity-80 transition">
                ${window.formatLikersText ? window.formatLikersText(post.like_count, post.recent_liker, post.second_liker, false, post.id) : `Liked by @${post.recent_liker} and ${post.like_count - 1} others`}
            </div>
        </div>
        <div class="flex justify-between items-center px-6 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <button class="flex items-center space-x-2 transition ${post.user_liked ? 'text-red-500 dark:text-red-400' : 'text-slate-400 hover:text-red-500'}" onclick="window.toggleLike(event, ${post.id}, this)">
                <i class="${post.user_liked ? 'fas' : 'far'} fa-heart text-xl"></i>
                <span class="text-xs font-bold">${post.like_count}</span>
            </button>
            <button class="flex items-center space-x-2 text-slate-400 hover:text-blue-500 transition" onclick="window.location.href='post.html?id=${post.id}'">
                <i class="fas fa-comment text-lg"></i>
                <span class="text-xs font-bold">${post.comment_count}</span>
            </button>
            <button class="flex items-center space-x-2 text-slate-400 hover:text-green-500 transition" onclick="window.copyLink(event, ${post.id})">
                <i class="fas fa-link text-lg"></i>
            </button>
            <button class="flex items-center space-x-2 transition ${post.user_saved ? 'text-yellow-500 dark:text-yellow-400' : 'text-slate-400 hover:text-yellow-500'}" onclick="window.toggleSave(event, ${post.id}, this)">
                <i class="${post.user_saved ? 'fas' : 'far'} fa-bookmark text-lg"></i>
            </button>
        </div>
    `;

    setupSwipe(card);
    return card;
}

function setupSwipe(card) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function ignoreSwipe(e) {
        if (e.target.closest('button') || e.target.closest('a')) {
            return true;
        }
        return false;
    }

    const startDrag = (e) => {
        if (ignoreSwipe(e)) return;
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        currentX = startX;
        card.style.transition = 'none';
    };

    const drag = (e) => {
        if (!isDragging) return;
        currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diffX = currentX - startX;
        card.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.05}deg)`;
    };

    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = currentX - startX;
        card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        if (Math.abs(diffX) > 100) {
            isAnimating = true;
            const direction = diffX > 0 ? 1000 : -1000;
            card.style.transform = `translateX(${direction}px) rotate(${direction * 0.05}deg)`;
            card.style.opacity = '0';

            setTimeout(() => {
                card.remove();
                isAnimating = false;
                showNextPost();
            }, 300);
        } else {
            card.style.transform = `translateX(0px) rotate(0deg)`;
        }
    };

    card.addEventListener('mousedown', startDrag);
    card.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);

    card.addEventListener('touchstart', startDrag);
    card.addEventListener('touchmove', drag);
    window.addEventListener('touchend', endDrag);
}

window.forceSwipe = function(direction) {
    if (!activeCard || isAnimating) return;
    
    isAnimating = true;
    const dirVal = direction === 'right' ? 1000 : -1000;
    
    activeCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    activeCard.style.transform = `translateX(${dirVal}px) rotate(${dirVal * 0.05}deg)`;
    activeCard.style.opacity = '0';

    setTimeout(() => {
        activeCard.remove();
        isAnimating = false;
        showNextPost();
    }, 300);
};

window.getVerifiedBadgeSvg = function(extraClass = 'ml-[1px]', isStatic = false) {
    return `<span class="verified-badge-icon ${extraClass}" oncontextmenu="return false;" title="Verified User: This account represents a notable public figure or creator."></span>`;
};

// --- Mock Interaction Logic ---

window.toggleFollow = function(event, btn, userId) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    
    const isFollowing = btn.textContent.trim() === 'Following';
    
    // Update data state so next cards by this user reflect it
    window.allDemoPosts.forEach(p => {
        if (p.user_id === userId) {
            p.is_following = !isFollowing ? 1 : 0;
        }
    });
    preloadedPosts.forEach(p => {
        if (p.user_id === userId) {
            p.is_following = !isFollowing ? 1 : 0;
        }
    });

    // Update all visible buttons for this user on the page
    document.querySelectorAll(`.follow-btn-${userId}`).forEach(b => {
        if (isFollowing) {
            b.textContent = 'Follow';
            b.className = `follow-btn-${userId} text-blue-500 hover:text-blue-600 font-bold transition-colors`;
            if (window.showToast) window.showToast('Unfollowed user');
        } else {
            b.textContent = 'Following';
            b.className = `follow-btn-${userId} text-slate-400 hover:text-slate-500 font-bold transition-colors`;
            if (window.showToast) window.showToast('Following user');
        }
    });
};

window.toggleLike = function(event, postId, btn) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    let isLiked = btn.classList.contains('text-red-500');
    let span = btn.querySelector('span');
    let count = parseInt(span.textContent, 10);
    
    if (isLiked) {
        btn.classList.remove('text-red-500', 'dark:text-red-400');
        btn.classList.add('text-slate-400', 'hover:text-red-500');
        btn.querySelector('i').classList.replace('fas', 'far');
        span.textContent = count - 1;
    } else {
        btn.classList.remove('text-slate-400', 'hover:text-red-500');
        btn.classList.add('text-red-500', 'dark:text-red-400');
        btn.querySelector('i').classList.replace('far', 'fas');
        span.textContent = count + 1;
        
        const bigHeart = document.getElementById(`big-heart-${postId}`);
        if (bigHeart) {
            bigHeart.style.animation = 'none';
            bigHeart.offsetHeight; // trigger reflow
            bigHeart.style.animation = 'bigHeartPopInteractive 0.8s ease-out forwards';
        }
    }
};

window.toggleSave = function(event, postId, btn) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    let isSaved = btn.classList.contains('text-yellow-500');
    
    if (isSaved) {
        btn.classList.remove('text-yellow-500', 'dark:text-yellow-400');
        btn.classList.add('text-slate-400', 'hover:text-yellow-500');
        btn.querySelector('i').classList.replace('fas', 'far');
    } else {
        btn.classList.remove('text-slate-400', 'hover:text-yellow-500');
        btn.classList.add('text-yellow-500', 'dark:text-yellow-400');
        btn.querySelector('i').classList.replace('far', 'fas');
        
        const bigSave = document.getElementById(`big-save-${postId}`);
        if (bigSave) {
            bigSave.style.animation = 'none';
            bigSave.offsetHeight; // trigger reflow
            bigSave.style.animation = 'bigHeartPopInteractive 0.8s ease-out forwards';
        }
    }
};

window.copyLink = function(event, postId) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    const url = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '/')}post.html?id=${postId}`;
    navigator.clipboard.writeText(url).then(() => {
        const card = document.querySelector(`.post-card`);
        const imgWrapper = card ? card.querySelector('.image-wrapper-target') : null;
        if (imgWrapper && window.showToast) {
            window.showToast('Link copied successfully!', imgWrapper);
        } else if (card && window.showToast) {
            window.showToast('Link copied successfully!', card);
        } else {
            alert("Link copied to clipboard: " + url);
        }
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
};

window.showToast = function(message, containerElement = null) {
    if (containerElement) {
        containerElement.style.position = 'relative';
        const toast = document.createElement('div');
        toast.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 dark:bg-black/90 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl transition-all duration-300 opacity-0 pointer-events-none flex items-center gap-2 border border-slate-700/50 z-50 whitespace-nowrap scale-95';
        toast.innerHTML = `<i class="fas fa-check-circle text-green-500"></i><span>${message}</span>`;
        containerElement.appendChild(toast);
        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'scale-95');
            toast.classList.add('opacity-100', 'scale-100');
        });
        setTimeout(() => {
            toast.classList.remove('opacity-100', 'scale-100');
            toast.classList.add('opacity-0', 'scale-95');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
        return;
    }
};

// --- Single Post Logic ---
window.initSinglePost = function() {
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'));
    const post = window.allDemoPosts.find(p => p.id === postId) || window.allDemoPosts[0];
    
    if (!post) {
        document.getElementById('single-post-container').innerHTML = '<p class="p-4 text-center">Post not found.</p>';
        return;
    }
    
    // Create card without swipe
    const card = createPostCard(post);
    card.classList.remove('absolute', 'swipe-card', 'max-h-[calc(100%-1rem)]', 'md:max-h-[calc(100%-2rem)]');
    card.classList.add('relative', 'mb-6');
    // Remove swipe event listeners attached by createPostCard by cloning and replacing
    const cardClone = card.cloneNode(true);
    document.getElementById('single-post-container').appendChild(cardClone);
    
    // Attach single post specific logic
    cardClone.querySelectorAll('button[onclick*="toggleLike"]').forEach(btn => {
        btn.setAttribute('onclick', `window.toggleLike(event, ${post.id}, this)`);
    });
    cardClone.querySelectorAll('button[onclick*="toggleSave"]').forEach(btn => {
        btn.setAttribute('onclick', `window.toggleSave(event, ${post.id}, this)`);
    });
    
    // Add the comments section inside the card
    const commentsHtml = `
        <div class="comments-section border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 max-h-60 flex flex-col" id="comments-${post.id}">
            <div class="comments-list overflow-y-auto p-4 space-y-3 flex-1" id="comments-list">
                <!-- Comments injected via renderMockComments -->
            </div>
            <div class="flex items-center space-x-2 p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <input type="text" id="comment-input" onkeydown="if(event.key === 'Enter') { event.preventDefault(); postComment(event); }" class="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-full bg-transparent text-base focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white" placeholder="Add a comment...">
                <button onclick="postComment(event)" class="text-blue-500 hover:text-blue-600 p-2"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    cardClone.insertAdjacentHTML('beforeend', commentsHtml);

    renderMockComments();
};

function renderMockComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = `
        <div class="flex space-x-3 mb-2 animate-fade-in">
            <img src="https://ui-avatars.com/api/?name=User+One&background=cbd5e1" class="w-8 h-8 rounded-full" alt="Avatar">
            <div class="flex-1">
                <div class="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 inline-block">
                    <span class="font-bold text-sm text-slate-800 dark:text-slate-100 block">user_one</span>
                    <span class="text-sm text-slate-700 dark:text-slate-300">This is a fantastic demo! Love the UI.</span>
                </div>
                <div class="text-xs text-slate-400 mt-1 ml-2">2 hours ago</div>
            </div>
        </div>
    `;
}

window.postComment = function(event) {
    if(event) event.preventDefault();
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if(!text) return;
    
    const commentsList = document.getElementById('comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'flex space-x-3 mb-2 animate-fade-in';
    newComment.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=Demo+User&background=3b82f6&color=fff" class="w-8 h-8 rounded-full" alt="Avatar">
        <div class="flex-1">
            <div class="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 inline-block">
                <span class="font-bold text-sm text-slate-800 dark:text-slate-100 block">demouser</span>
                <span class="text-sm text-slate-700 dark:text-slate-300">${text}</span>
            </div>
            <div class="text-xs text-slate-400 mt-1 ml-2">Just now</div>
        </div>
    `;
    commentsList.insertBefore(newComment, commentsList.firstChild);
    input.value = '';
    
    // Update count in card
    const commentCountSpan = document.querySelector('button[onclick*="post.html"] span');
    if (commentCountSpan) {
        commentCountSpan.textContent = parseInt(commentCountSpan.textContent, 10) + 1;
    }
};
