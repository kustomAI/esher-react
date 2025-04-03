import { useEffect } from 'react';

const AIWidgetComponent = ({ companyId, parent }) => {
  useEffect(() => {
    // Function to get or create a unique user ID
    const getUserId = () => {
      let userId = localStorage.getItem('esher_user_id');
      if (!userId) {
        userId = 'user_' + Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        localStorage.setItem('esher_user_id', userId);
      }
      return userId;
    };

    // Function to track user visits
    const trackVisit = () => {
      console.log('🔍 trackVisit function called');
      const userId = getUserId();
      
      fetch('https://backendxyz.esher.im/log-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          companyId
        }),
      })
      .then(res => {
        console.log('📥 Server response status:', res.status);
        console.log('📥 Server response ok:', res.ok);
        if (res.ok) {
          console.log('✅ Visit tracked successfully');
          return res.json();
        } else {
          console.error('❌ Failed to track visit. Status:', res.status);
          throw new Error(`Failed with status ${res.status}`);
        }
      })
      .then(data => {
        console.log('📊 Response data:', data);
      })
      .catch(err => {
        console.error('❌ Tracking error:', err);
        console.error('❌ Error details:', err.message);
      });
    };

    let currentUrl = window.location.href;

    // Function to initialize the widget
    const initializeWidget = () => {
      if (!window.aiWidget || window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        window.aiWidget = new AIWidget(parent, 'relative', companyId, currentUrl);
        trackVisit();
      }
    };

    // Function to load the external script
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://backendxyz.esher.im/widget.js/${companyId}`;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Observe mutations in the DOM to detect added elements
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length && document.querySelector(parent)) {
          initializeWidget();
          break;
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Load the script and initialize the widget
    const initializeOnLoad = async () => {
      try {
        await loadScript();
        if (document.querySelector(parent)) {
          initializeWidget();
        }
      } catch (e) {
        console.error('Script load failed:', e);
      }
    };

    initializeOnLoad();

    // Cleanup function to disconnect the observer when component unmounts
    return () => observer.disconnect();
  }, [companyId, parent]);

  return null;
};

export default AIWidgetComponent;