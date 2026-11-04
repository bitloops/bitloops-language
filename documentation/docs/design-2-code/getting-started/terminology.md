---
sidebar_position: 3
sidebar_label: Terminology
title: "Terminology"
description: "Learn key terms used in Bitloops Frontend Copilot, from components and designs to containers and elements."
keywords:
  [
    bitloops terminology,
    figma-2-react terms,
    frontend development glossary,
    responsive UI generation,
    automated frontend testing,
    component testing definitions,
    design-to-code concepts,
    UI/UX development terms,
    bitloops definitions,
  ]
---

Here are the key terms used throughout Bitloops Frontend Copilot. Understanding these will help you make the most of the platform.

---

### **Core Terms**

#### **1. Component**  
A **coded UI element** generated from a Figma design frame. Components are reusable, testable, and follow best practices in web development. They can represent anything from small UI elements (like buttons) to full-page sections (like a header or footer).

#### **2. Design**  
A **frame from a Figma file** that serves as the source of truth for generating components. A design can be:  
- A full webpage or screen layout.  
- A UI section like a navbar, footer, or sidebar.  
- A smaller frame, such as a button, card, or form field.

#### **3. Figma File**  
The **Figma project file** containing all design frames. Bitloops pulls frames from this file to create components and run tests.

#### **4. Element**  
A **single design element** within a design or component. Examples include:  
- Text fields (labels, headings, paragraphs)  
- Buttons  
- Icons  
- Images  

Elements are the building blocks of components and can be combined into more complex layouts.

#### **5. Container**  
A **layout structure** used to group elements or other containers. Containers allow for more complex UI structures by managing:  
- **Element Grouping:** Organizing multiple elements or nested containers.  
- **Layout Behavior:** Controlling element alignment, spacing, and stacking.

---

### **Testing Concepts**

#### **6. Storybook Story**  
An **interactive visual test case** generated from a component. Storybook stories allow developers to:  
- Preview how components look and behave in isolation.  
- Adjust component properties interactively.  
- Document the intended appearance and functionality of components.  

Storybook serves as both a testing tool and a UI component library.

#### **7. Property Tests**  
Automated **design verification tests** that compare components against design specifications from Figma. They check for:  
- **Font properties:** Correct font size, type, and color  
- **Element size and location:** Width, height, margins, paddings, and alignment  
- **Design Constraints:** Minimum and maximum dimensions, aspect ratios, etc.  

Property tests ensure that components match their Figma designs pixel-perfectly.

#### **8. Responsiveness Tests**  
Automated **adaptive behavior tests** that validate how components respond to different screen sizes. These tests check for:  
- Proper resizing of elements and containers  
- Correct alignment and spacing when the viewport changes  
- Support for common breakpoints like mobile, tablet, and desktop views  

This ensures a consistent user experience across devices.


### **Specific Elements and Components**  

#### **9. Button Component**  
A **clickable UI element** designed to trigger actions such as form submissions, navigation, or interactions.  
- **Auto-Detection (Coming Soon):** Bitloops will soon detect buttons automatically based on design frame properties.  
- **Manual Definition (Current):** Until auto-detection is supported, buttons must be manually defined in the system.

#### **10. Text Element**  
A **content element** containing only text. Common examples include:  
- **Headings:** H1, H2, etc.  
- **Paragraphs:** Standard body text  
- **Labels:** Descriptive text for form fields or buttons  

Text elements follow specific properties like font size, color, alignment, and weight.

#### **11. Image Element**  
An **element containing visual content**, such as photos, icons, or logos. Supported file types typically include:  
- **Raster Images:** JPG, PNG  
- **Vector Images:** SVG  

Images are styled with properties like width, height, aspect ratio, and alignment.
