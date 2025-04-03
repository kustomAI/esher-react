# Esher AI Widget

A lightweight React component for integrating Esher's AI-powered widget into your e-commerce or web application.

## Installation

To install the latest version of the Esher AI Widget, run:

```sh
npm install esher@latest
```

## Overview

The Esher AI Widget provides an intelligent assistant that enhances the shopping experience by:
- Helping customers find products
- Answering questions
- Enhancing user interactions

The widget attaches to elements on your page (typically "Add to Cart" buttons) and provides context-aware assistance to users.

## Usage

Import and initialize the AI Widget in your React application:

```jsx
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
```

## Features

- **Automatic Tracking**: Records user interactions to improve AI suggestions.
- **Context-Aware**: Understands the page context to provide relevant assistance.
- **Non-Intrusive**: Integrates seamlessly with your existing UI elements.
- **Lightweight**: Minimal impact on page load times.
- **Responsive**: Works across desktop and mobile devices.

## Custom Selector

You can attach the widget to any element by customizing the `parent` prop:

```jsx
<AIWidgetComponent
  companyId="YOUR_COMPANY_ID"
  parent=".custom-button-class"
/>
```

## License

This project is licensed under the MIT License.

