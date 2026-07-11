(function() {
    // Inject HTML for Custom Dialogs if not present
    function injectDialogsHTML() {
        if (!document.body) return; // safeguard
        if (document.getElementById('custom-dialogs-container')) return;
        
        const container = document.createElement('div');
        container.id = 'custom-dialogs-container';
        
        let html = '';
        
        // Only inject if not already hardcoded in the HTML
        if (!document.getElementById('custom-alert-modal')) {
            html += `
            <!-- Custom Alert Modal -->
            <div id="custom-alert-modal" class="fixed inset-0 hidden items-center justify-center p-4" style="z-index: 99999;">
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0" id="alert-backdrop"></div>
                <div class="relative bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 transform scale-90 opacity-0 transition-all duration-300 ease-out flex flex-col max-h-[85vh]" id="alert-box">
                    <div class="flex items-center space-x-3 p-6 pb-4 flex-shrink-0">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg" id="alert-icon-container">
                            <i id="alert-icon"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white" id="alert-title">Notice</h3>
                    </div>
                    <div class="overflow-y-auto flex-1 min-h-0 px-6">
                        <p class="text-sm text-slate-500 dark:text-slate-400 break-words" id="alert-message"></p>
                    </div>
                    <div class="flex space-x-3 justify-end p-6 pt-4 flex-shrink-0">
                        <button id="alert-ok-btn" class="px-6 py-2 rounded-xl text-sm font-semibold text-white transition duration-200 shadow-md">OK</button>
                    </div>
                </div>
            </div>`;
        }

        if (!document.getElementById('custom-confirm-modal')) {
            html += `
            <!-- Custom Confirm Modal -->
            <div id="custom-confirm-modal" class="fixed inset-0 hidden items-center justify-center p-4" style="z-index: 99999;">
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0" id="confirm-backdrop"></div>
                <div class="relative bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 transform scale-90 opacity-0 transition-all duration-300 ease-out flex flex-col max-h-[85vh]" id="confirm-box">
                    <div class="flex items-center space-x-3 p-6 pb-4 flex-shrink-0">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center" id="confirm-icon-container">
                            <i class="text-lg" id="confirm-icon"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white" id="confirm-title">Confirm Action</h3>
                    </div>
                    <div class="overflow-y-auto flex-1 min-h-0 px-6">
                        <p class="text-sm text-slate-500 dark:text-slate-400 break-words" id="confirm-message"></p>
                    </div>
                    <div class="flex space-x-3 justify-end p-6 pt-4 flex-shrink-0">
                        <button id="confirm-cancel-btn" class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 transition duration-200">Cancel</button>
                        <button id="confirm-ok-btn" class="px-4 py-2 rounded-xl text-sm font-semibold text-white transition duration-200 shadow-md">Confirm</button>
                    </div>
                </div>
            </div>`;
        }

        if (!document.getElementById('custom-prompt-modal')) {
            html += `
            <!-- Custom Prompt Modal -->
            <div id="custom-prompt-modal" class="fixed inset-0 hidden items-center justify-center p-4" style="z-index: 99999;">
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0" id="prompt-backdrop"></div>
                <div class="relative bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 transform scale-90 opacity-0 transition-all duration-300 ease-out flex flex-col max-h-[85vh]" id="prompt-box">
                    <div class="flex items-center space-x-3 p-6 pb-4 flex-shrink-0">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-950/50 text-blue-500" id="prompt-icon-container">
                            <i class="fas fa-question-circle text-lg" id="prompt-icon"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white" id="prompt-title">Input Required</h3>
                    </div>
                    <div class="overflow-y-auto flex-1 min-h-0 px-6">
                        <p class="text-sm text-slate-500 dark:text-slate-400 break-words mb-3" id="prompt-message"></p>
                        <input type="text" id="prompt-input" class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    </div>
                    <div class="flex space-x-3 justify-end p-6 pt-4 flex-shrink-0">
                        <button id="prompt-cancel-btn" class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 transition duration-200">Cancel</button>
                        <button id="prompt-ok-btn" class="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md shadow-blue-500/20">Submit</button>
                    </div>
                </div>
            </div>`;
        }
        
        if (html) {
            container.innerHTML = html;
            document.body.appendChild(container);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectDialogsHTML);
    } else {
        injectDialogsHTML();
    }

    window.App = window.App || {};

    window.App.alert = function(title, message, type = 'info') {
        try {
            injectDialogsHTML();
            const modal = document.getElementById('custom-alert-modal');
            const backdrop = document.getElementById('alert-backdrop');
            const box = document.getElementById('alert-box');
            
            if (!modal || !backdrop || !box) {
                window.alert(title + '\n\n' + message);
                return Promise.resolve();
            }

            const titleEl = document.getElementById('alert-title');
            const messageEl = document.getElementById('alert-message');
            const iconEl = document.getElementById('alert-icon');
            const iconContainer = document.getElementById('alert-icon-container');
            const okBtn = document.getElementById('alert-ok-btn');
            
            // Clean up old listeners
            const newOkBtn = okBtn.cloneNode(true);
            okBtn.parentNode.replaceChild(newOkBtn, okBtn);
            
            return new Promise((resolve) => {
                newOkBtn.addEventListener('click', () => {
                    backdrop.classList.remove('opacity-100');
                    backdrop.classList.add('opacity-0');
                    box.classList.remove('scale-100', 'opacity-100');
                    box.classList.add('scale-90', 'opacity-0');
                    setTimeout(() => {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        resolve();
                    }, 300);
                });

                titleEl.textContent = title;
                messageEl.innerHTML = message;

                // Reset colors
                iconContainer.className = 'w-10 h-10 rounded-full flex items-center justify-center text-lg';
                
                if (type === 'error') {
                    iconContainer.classList.add('bg-red-100', 'text-red-500', 'dark:bg-red-900/30', 'dark:text-red-400');
                    iconEl.className = 'fas fa-exclamation-circle';
                    newOkBtn.className = 'px-6 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md transition';
                } else if (type === 'warning') {
                    iconContainer.classList.add('bg-yellow-100', 'text-yellow-500', 'dark:bg-yellow-900/30', 'dark:text-yellow-400');
                    iconEl.className = 'fas fa-exclamation-triangle';
                    newOkBtn.className = 'px-6 py-2 rounded-xl text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow-md transition';
                } else if (type === 'success') {
                    iconContainer.classList.add('bg-green-100', 'text-green-500', 'dark:bg-green-900/30', 'dark:text-green-400');
                    iconEl.className = 'fas fa-check-circle';
                    newOkBtn.className = 'px-6 py-2 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 shadow-md transition';
                } else {
                    iconContainer.classList.add('bg-blue-100', 'text-blue-500', 'dark:bg-blue-900/30', 'dark:text-blue-400');
                    iconEl.className = 'fas fa-info-circle';
                    newOkBtn.className = 'px-6 py-2 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-md transition';
                }

                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                // Force reflow
                void modal.offsetWidth;

                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
                box.classList.remove('scale-90', 'opacity-0');
                box.classList.add('scale-100', 'opacity-100');
            });
        } catch (e) {
            window.alert(title + '\n\n' + message);
            return Promise.resolve();
        }
    };

    window.App.confirm = function(title, message, confirmText = 'Confirm', type = 'danger') {
        injectDialogsHTML();
        return new Promise((resolve) => {
            const modal = document.getElementById('custom-confirm-modal');
            const backdrop = document.getElementById('confirm-backdrop');
            const box = document.getElementById('confirm-box');
            const titleEl = document.getElementById('confirm-title');
            const messageEl = document.getElementById('confirm-message');
            const cancelBtn = document.getElementById('confirm-cancel-btn');
            const okBtn = document.getElementById('confirm-ok-btn');
            const iconContainer = document.getElementById('confirm-icon-container');
            const icon = document.getElementById('confirm-icon');

            titleEl.textContent = title;
            messageEl.innerHTML = message;
            okBtn.textContent = confirmText;

            if (type === 'danger') {
                okBtn.className = "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 shadow-md shadow-red-500/20";
                iconContainer.className = "w-10 h-10 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-950/50 text-red-500";
                icon.className = "fas fa-exclamation-triangle text-lg";
            } else {
                okBtn.className = "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md shadow-blue-500/20";
                iconContainer.className = "w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-950/50 text-blue-500";
                icon.className = "fas fa-question-circle text-lg";
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Force reflow
            void modal.offsetWidth;

            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            box.classList.remove('scale-90', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');

            const closeModal = (result) => {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
                box.classList.remove('scale-100', 'opacity-100');
                box.classList.add('scale-90', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    resolve(result);
                }, 300);
            };

            cancelBtn.onclick = () => closeModal(false);
            backdrop.onclick = () => closeModal(false);
            okBtn.onclick = () => closeModal(true);
        });
    };
    
    window.App.prompt = function(title, message, defaultValue = '') {
        injectDialogsHTML();
        return new Promise((resolve) => {
            const modal = document.getElementById('custom-prompt-modal');
            const backdrop = document.getElementById('prompt-backdrop');
            const box = document.getElementById('prompt-box');
            const titleEl = document.getElementById('prompt-title');
            const messageEl = document.getElementById('prompt-message');
            const inputEl = document.getElementById('prompt-input');
            const cancelBtn = document.getElementById('prompt-cancel-btn');
            const okBtn = document.getElementById('prompt-ok-btn');

            titleEl.textContent = title;
            messageEl.innerHTML = message;
            inputEl.value = defaultValue;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Force reflow
            void modal.offsetWidth;

            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            box.classList.remove('scale-90', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
            
            inputEl.focus();

            const closeModal = (result) => {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
                box.classList.remove('scale-100', 'opacity-100');
                box.classList.add('scale-90', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    resolve(result);
                }, 300);
            };

            cancelBtn.onclick = () => closeModal(null);
            backdrop.onclick = () => closeModal(null);
            okBtn.onclick = () => closeModal(inputEl.value);
            inputEl.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    closeModal(inputEl.value);
                } else if (e.key === 'Escape') {
                    closeModal(null);
                }
            };
        });
    };
    
    window.showOptionsModal = function(options) {
        let modalEl = document.getElementById('options-modal');
        if (!modalEl) {
            const html = `
                <div id="options-modal" class="fixed inset-0 z-[100] hidden items-end sm:items-center justify-center">
                    <div id="options-backdrop" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 transition-opacity duration-300" onclick="closeOptionsModal()"></div>
                    <div id="options-box" class="relative bg-white dark:bg-slate-800 w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl shadow-2xl transform translate-y-full sm:translate-y-0 sm:scale-90 opacity-0 transition-all duration-300 overflow-hidden pb-safe">
                        <div class="flex flex-col" id="options-content">
                        </div>
                        <div class="p-2 bg-slate-50 dark:bg-slate-900/50 sm:hidden">
                            <button onclick="closeOptionsModal()" class="w-full py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl font-bold shadow-sm border border-slate-200 dark:border-slate-700">Cancel</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
            modalEl = document.getElementById('options-modal');
        }

        const backdrop = document.getElementById('options-backdrop');
        const box = document.getElementById('options-box');
        const content = document.getElementById('options-content');

        content.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `w-full text-left px-6 py-4 font-semibold text-sm transition border-b border-slate-100 dark:border-slate-700 last:border-0 ${opt.isDanger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`;
            btn.innerHTML = opt.label;
            btn.onclick = (e) => {
                e.preventDefault();
                window.closeOptionsModal();
                if(opt.onClick) setTimeout(() => opt.onClick(), 300);
            };
            content.appendChild(btn);
        });

        modalEl.classList.remove('hidden');
        modalEl.classList.add('flex');
        
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            box.classList.remove('translate-y-full', 'sm:scale-90', 'opacity-0');
            box.classList.add('translate-y-0', 'sm:scale-100', 'opacity-100');
        }, 10);

        window.closeOptionsModal = () => {
            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            box.classList.remove('translate-y-0', 'sm:scale-100', 'opacity-100');
            box.classList.add('translate-y-full', 'sm:scale-90', 'opacity-0');
            setTimeout(() => {
                modalEl.classList.add('hidden');
                modalEl.classList.remove('flex');
            }, 300);
        };
    };
})();
