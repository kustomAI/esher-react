import { useEffect } from 'react';

const AIWidgetComponent = ({ companyId, parent}) => {
    useEffect(() => {
        let currentUrl = window.location.href;

        function getUserId() {
            let userId = localStorage.getItem('esher_user_id');
            if (!userId) {
                userId = 'user_' + Math.random().toString(36).substring(2, 15);
                localStorage.setItem('esher_user_id', userId);
            }
            return userId;
        }

        function trackVisit() {
            const userId = getUserId();
            const today = new Date().toISOString().split('T')[0];
            const visitKey = `esher_visit_${companyId}_${today}`;

            if (!localStorage.getItem(visitKey)) {
                localStorage.setItem(visitKey, 'true');
                fetch('http://localhost:4004/track-visit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, companyId, url: currentUrl, timestamp: new Date().toISOString() }),
                }).then(response => {
                    if (response.ok) console.log('Visit tracked successfully');
                }).catch(error => console.error('Error tracking visit:', error));
            }
        }

        function initializeWidget() {
            if (!window.aiWidget) {
                window.aiWidget = new AIWidget(parent, 'relative', companyId, currentUrl);
                trackVisit();
            }

            if (currentUrl !== window.location.href) {
                currentUrl = window.location.href;
                window.aiWidget = new AIWidget(parent, 'relative', companyId, currentUrl);
            }
        }

        function loadScript() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `http://localhost:4004/widget.js/${companyId}`;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length && document.querySelector(parent)) {
                    initializeWidget();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        loadScript().then(() => {
            if (document.querySelector(parent)) {
                initializeWidget();
            }
        }).catch(error => console.error('Failed to load widget script:', error));

        return () => observer.disconnect();
    }, [companyId, parent]);

    return null;
};

export default AIWidgetComponent;
