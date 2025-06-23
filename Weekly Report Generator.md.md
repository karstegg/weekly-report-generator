# **Product Requirements Document (PRD): Semi-Automated Weekly Report Generator**

Version: 1.1  
Date: June 22, 2025  
Author: Gemini Assistant (in collaboration with user)  
Status: Scoped for Generative Process

## **1\. Introduction & Vision**

### **1.1. Problem Statement**

Production Engineering teams across multiple mining sites generate detailed weekly performance data. Compiling this data into a consistent, high-quality, and visually appealing slide deck is a manual and time-consuming process. There is a need to standardize and accelerate the creation of this weekly report.

### **1.2. Vision**

To establish a streamlined, semi-automated process for generating the standardized **Weekly Engineering Report**. This process will enable a user to provide structured weekly data to a generative AI assistant, which will then use a predefined template to compile and output the complete, multi-slide report. This will dramatically reduce manual effort, enforce consistency, and serve as a reliable foundation for future development into a more interactive application.

### **1.3. High-Level Goals**

* **Standardize Data Input:** Define a clear structure for weekly data (HEAL pages, KPIs, breakdowns) so it can be programmatically processed.  
* **Automate Compilation:** Create a robust generative process that takes structured data as input and generates the complete React-based slide deck as output.  
* **Maintain Visual Quality:** Ensure the generated report consistently adheres to the established high-quality visual design of the template.  
* **Enable Easy Updates:** Allow a user to easily provide new weekly data and regenerate the report without needing to manually edit code.

## **2\. Core Features of the Generator**

This section outlines the core features and logic that define the report generation process.

### **2.1. Data-Driven Generation**

The entire process is predicated on the user supplying the data for a given week. The generator's role is to interpret this data and place it correctly within the visual template.

* **Input:** The user will provide raw data, which can include:  
  * Text-based HEAL summaries (Highlights, Lowlights, Emerging Issues, Priorities) for each site.  
  * Performance metrics (e.g., weekly average availability, service compliance percentages).  
  * Key breakdown lists and reasons for performance deviations.  
  * Image URLs for trend charts.  
* **Processing:** The generative model is responsible for parsing this input and synthesizing it into the required format for each slide. For instance, it must combine all individual HEAL page data into the single Departmental Overview slide, prefixing each item with its source (e.g., \[N2\]).

### **2.2. Component-Based Template**

The report is built from a pre-defined set of React components. The generator must assemble these components to create the final report.

* **Slide Structure:** The output is a single React component containing multiple "slide" divs, each styled to a 960px x 720px dimension.  
* **Standard Slide Types:** The generator will use templates for:  
  * The graphical Title Slide.  
  * The Index Slide.  
  * The four-quadrant Departmental HEAL slide.  
  * The KPI-driven Shafts & Winders performance slide.  
  * The image-based Weekly Availability Trend slides.  
  * The detailed Site Performance slides (for N3, N2, Gloria).  
  * The dedicated BEV Performance slide.  
* **Conditional Rendering:** The generator must be able to conditionally omit slides. If data for a section (e.g., Nchwaning 2\) is not provided, its corresponding slides (Trend and Performance) must not be included in the final output, and the Index slide must be updated to reflect this omission.

### **2.3. Styling and Design**

The visual identity of the report is critical and must be strictly adhered to.

* **Styling Engine:** All styling must be implemented using **Tailwind CSS** utility classes. No other CSS methods should be used.  
* **Iconography:** The **Lucide-React** library is the sole source for icons.  
* **Static Assets:** Image URLs (for the title slide, trend charts, etc.) will be provided in the prompt and must be used as-is. All \<img\> tags must include an onError handler to prevent broken image links.

### **2.4. Final Output**

The process culminates in a single, deliverable artifact:

* **A self-contained React component (.js / .jsx file).**  
* The code must be complete, runnable, and require no further manual editing to function, assuming a standard React environment.