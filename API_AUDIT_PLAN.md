# API Audit and Fix Plan

## Goal
Ensure all Frontend API calls match the Backend API definitions (URL, Method, Payload) to eliminate 400 Bad Request errors.

## Group 1: Auth, Profile, Address
- [ ] **Auth**: `src/api/auth.ts` vs `AuthenticationController.cs`
- [ ] **Profile**: `src/api/profile.ts` / `src/services/profile.service.ts` vs `ProfileController.cs`
- [ ] **Address**: `src/api/address.ts` vs `AddressController.cs`

## Group 2: Farms, Favorites
- [ ] **Farms**: `src/services/farm.service.ts` vs `FarmController.cs`
- [ ] **Favorites**: `src/services/favoriteFarmService.ts` vs `FavoriteFarmController.cs`
- [ ] **Reviews**: `src/services/farmReviewService.ts` vs `FarmController.cs`

## Group 3: Products, Seasons, Batches
- [ ] **Categories**: `src/services/categories.service.ts` vs `CategoryController.cs`
- [ ] **Products**: `src/services/products.service.ts` vs `ProductController.cs`
- [ ] **Seasons**: `src/services/seasons.service.ts` vs `SeasonController.cs`
- [ ] **Batches**: `src/services/batches.service.ts` vs `ProductBatchController.cs`

## Group 4: Orders, Cart
- [ ] **Orders**: `src/services/orders.service.ts` vs `OrderController.cs`
- [ ] **Cart**: `src/services/cart.service.ts` vs `CartController.cs`

## Group 5: Care Events
- [ ] **Care Events**: `src/services/care-events.service.ts` vs `CareEventController.cs`
