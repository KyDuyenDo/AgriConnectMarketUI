# AgriConnect Market

AgriConnect Market is a dual-sided digital platform designed to revolutionize the agricultural supply chain by directly connecting farmers with consumers. It combines a robust e-commerce marketplace with advanced farm management and traceability tools, ensuring transparency and trust in every transaction.

## 🚀 System Overview

The system consists of two primary applications within a single ecosystem:
1.  **Farmer Portal**: A management tool for growers to track production, manage inventory, and fulfill orders.
2.  **Customer Marketplace**: A shopping app for consumers to discover fresh produce, view transparency data, and purchase directly from farms.

The solution is built with a **Mobile-First** approach using React Native (Expo) for the frontend and a **.NET Clean Architecture** backend.

## ✨ Key Features

### 👨‍🌾 For Farmers (Producers)
*   **Farm Management**: Digital profile setup `FarmSetupInformationScreen`, certificate management, and season planning (`FarmSeasonsScreen`).
*   **Blockchain-Backed Traceability**: Granular tracking of **Seasons**, **Batches**, and **Lots**. Farmers can log daily care events (watering, fertilizing) using `AddCropLogEntryScreen`, ensuring immutable and tamper-proof transparency.
*   **Inventory & Sales**: Full product lifecycle management (`FarmerProductsScreen`, `AddProductScreen`) and real-time order processing (`FarmerOrdersScreen`).
*   **Analytics**: Dashboard for tracking sales performance and farm statistics (`FarmStatisticsScreen`).

### 🛒 For Customers (Consumers)
*   **Transparency & Traceability**:
    *   **Scan & Verify**: Ability to scan product QR codes to view the full journey of the produce (`ScanScreen`).
    *   **Batch Details**: View detailed crop logs and origin information, with blockchain verification ensuring data integrity (`CustomerBatchDetailScreen`).
*   **Marketplace Experience**:
    *   Explore farms and products (`ExploreScreen`, `FarmListScreen`).
    *   Advanced search and filtering.
    *   Favorites and following system (`CustomerFavoritesScreen`).
*   **Secure Purchasing**: Comprehensive cart and checkout flows (`CustomerCartScreen`, `CustomerCheckoutScreen`) with order history tracking.

## 🛠 Technology Stack

### Mobile Application (Frontend)
*   **Framework**: [React Native](https://reactnative.dev/) with [Expo SDK 54](https://expo.dev/).
*   **Language**: TypeScript.
*   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native) & Lucide Icons.
*   **Navigation**: React Navigation (Native Stack & Bottom Tabs).
*   **State Management**:
    *   **Zustand**: Global client-state management.
    *   **TanStack Query (React Query)**: Server-state caching and synchronization.
*   **Forms**: React Hook Form using resolvers and Yup validation.
*   **Key Libraries**:
    *   `react-native-vision-camera`: For QR code scanning and camera features.
    *   `react-native-chart-kit`: For visualization of farm statistics.
    *   `date-fns`: Date manipulation.

### Backend API
*   **Framework**: .NET (Core)
*   **Architecture**: Clean Architecture / Onion Architecture
    *   **WebApi**: API Entry points.
    *   **Application**: Business logic and use cases.
    *   **Domain**: Enterprise entities and core logic.
    *   **Infrastructure**: External concerns (Database, File System, Identity).
*   **Blockchain Integration**: Verification of care events and supply chain data integrity.

## 📂 Project Structure

```text
c:\AgriConnectMarketUI
├── src
│   ├── components      # Reusable UI components (atoms, molecules)
│   ├── screens         # Application screens (feature-based)
│   ├── navigation      # Navigators (Auth, Customer, Farm, Tabs)
│   ├── services        # API calls and external services
│   ├── stores          # Zustand state stores
│   ├── hooks           # Custom React hooks
│   ├── types           # TypeScript type definitions
│   └── utils           # Helper functions
├── AgriConnectMarket_BE # .NET Backend Solution
├── assets              # Static assets (images, fonts)
└── app.json            # Expo configuration
```

## 🏁 Getting Started

### Prerequisites
*   Node.js (LTS recommended)
*   Expo Go app on your physical device or an Android/iOS Simulator.

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
To start the development server:
```bash
npm start
```
*   Press `a` to run on Android Emulator.
*   Press `i` to run on iOS Simulator.
*   Scan the QR code with the Expo Go app to run on a physical device.
