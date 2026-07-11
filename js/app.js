window.formatLikersText = function(likeCount, recentLiker, secondLiker, showLinks, postId) {
    likeCount = parseInt(likeCount, 10);
    if (!likeCount || likeCount <= 0 || !recentLiker) {
        return '';
    }

    if (showLinks) {
        const recentLink = `<a href="#" onclick="window.event?.stopPropagation();" class="font-bold text-slate-700 dark:text-slate-300 hover:underline">@${recentLiker}</a>`;
        if (likeCount === 1) {
            return `Liked by ${recentLink}`;
        } else if (likeCount === 2 && secondLiker) {
            const secondLink = `<a href="#" onclick="window.event?.stopPropagation();" class="font-bold text-slate-700 dark:text-slate-300 hover:underline">@${secondLiker}</a>`;
            return `Liked by ${recentLink} and ${secondLink}`;
        } else {
            const othersCount = likeCount - 1;
            return `Liked by ${recentLink} and <button type="button" onclick="window.event?.stopPropagation(); alert('This is a static demo. User profiles are not implemented.');" class="font-bold text-slate-700 dark:text-slate-300 hover:underline">${othersCount} other${othersCount > 1 ? 's' : ''}</button>`;
        }
    } else {
        const recentSpan = `<span class="font-bold text-slate-700 dark:text-slate-300">@${recentLiker}</span>`;
        if (likeCount === 1) {
            return `Liked by ${recentSpan}`;
        } else if (likeCount === 2 && secondLiker) {
            const secondSpan = `<span class="font-bold text-slate-700 dark:text-slate-300">@${secondLiker}</span>`;
            return `Liked by ${recentSpan} and ${secondSpan}`;
        } else {
            const othersCount = likeCount - 1;
            return `Liked by ${recentSpan} and <span class="font-bold text-slate-700 dark:text-slate-300">${othersCount} other${othersCount > 1 ? 's' : ''}</span>`;
        }
    }
};

window.parseLinkAndPreviewForComments = function(text, idPrefix, id) {
    let parsedText = text || '';
    parsedText = parsedText ? parsedText.replace(/(^|\s)#(\w+)/g, `$1<a href="#" onclick="window.event?.stopPropagation(); alert('Static Demo: Search is disabled.');" class="text-blue-500 hover:underline">#$2</a>`).replace(/(^|\s)@(\w+)/g, `$1<a href="#" onclick="window.event?.stopPropagation(); alert('Static Demo: Profiles are disabled.');" class="text-blue-500 font-medium hover:underline">@$2</a>`) : '';
    return { text: parsedText, previewHtml: '' };
};
