Esher AI Widget
A lightweight React component for integrating Esher's AI-powered widget into your e-commerce or web application.

npm install esher@latest

Overview
The Esher AI Widget provides an intelligent assistant that can help your customers find products, answer questions, and enhance the shopping experience.
 It attaches to elements on your page (typically "Add to Cart" buttons) and provides context-aware assistance.

import React from 'react';
import AIWidgetComponent from 'esher';

function App() {
  return (
    <div className="App">
      <h1>My Store</h1>
      
      {/* Your product listings with add-to-cart buttons */}
      <div className="product">
        <h2>Product Name</h2>
        <p>Description</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
      
      {/* Initialize the AI Widget */}
      <AIWidgetComponent 
        companyId="YOUR_COMPANY_ID" 
        parent=".add-to-cart" 
      />
    </div>
  );
}

export default App;


Features

Automatic Tracking: Records user interactions to improve AI suggestions
Context-Aware: Understands the page context to provide relevant assistance
Non-Intrusive: Integrates seamlessly with your existing UI elements
Lightweight: Minimal impact on page load times
Responsive: Works across desktop and mobile devices


Custom Selector
You can attach the widget to any element by customizing the parent prop:

<AIWidgetComponent 
  companyId="YOUR_COMPANY_ID" 
  parent=".custom-button-class" 
/>
License
MIT
