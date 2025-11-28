# Uncommitted Features Documentation

This document outlines the features and changes currently present in the local source control but not yet committed.

## 1. Care Events System (Backend)
**Description**: A new system to track and manage care events (e.g., watering, fertilizing) for product batches.

**New Files**:
- `AgriConnectMarket.WebApi/Controllers/CareEventController.cs`
- `AgriConnectMarket.WebApi/Controllers/CareEventTypeController.cs`
- `AgriConnectMarket.Infrastructure/Services/CareEventService.cs`
- `AgriConnectMarket.Infrastructure/Services/EventTypeService.cs`
- `AgriConnectMarket.Infrastructure/Repositories/CareEventRepository.cs`
- `AgriConnectMarket.Infrastructure/Repositories/EventTypeRepository.cs`
- `AgriConnectMarket.Application/DTOs/RequestDtos/CreateCareEventDto.cs`
- `AgriConnectMarket.Application/DTOs/RequestDtos/CreateEventTypeDto.cs`
- `AgriConnectMarket.Application/DTOs/ResponseDtos/CareEventResponseDto.cs`
- `AgriConnectMarket.Application/Interfaces/ICareEventRepository.cs`
- `AgriConnectMarket.Application/Interfaces/IEventTypeRepository.cs`

**Database Changes**:
- Added `CareEvents` and `CareEventTypes` tables.

## 2. Farm Reviews System (Backend)
**Description**: A system allowing users to leave reviews for farms and specific batches.

**New Files**:
- `AgriConnectMarket.WebApi/Controllers/FarmReviewsController.cs`
- `AgriConnectMarket.Infrastructure/Services/FarmReviewService.cs`
- `AgriConnectMarket.Infrastructure/Repositories/FarmReviewRepository.cs`
- `AgriConnectMarket.Application/DTOs/FarmReviewDto.cs`
- `AgriConnectMarket.Application/Interfaces/IFarmReviewRepository.cs`

**Database Changes**:
- Added `FarmReviews` table.

## 3. Favorite Farms (Frontend & Backend)
**Description**: Functionality for users to mark farms as favorites.

**Frontend Changes**:
- **UI**: Updated `FarmFeatureCard.tsx` to include a heart icon for toggling favorites.
- **Logic**: Added `useToggleFavoriteFarm` hook in `src/hooks/useFavoriteFarm.ts`.
- **Service**: Added `toggleFavoriteFarm` method in `src/services/favoriteFarmService.ts`.

**Backend Changes**:
- **New Controller**: `AgriConnectMarket.WebApi/Controllers/FavoriteFarmController.cs`

**Modified Files**:
- `src/components/customer-exlore/FarmFeatureCard.tsx`
- `src/hooks/useFavoriteFarm.ts`
- `src/services/favoriteFarmService.ts`

## 4. Order System Refactoring (Backend)
**Description**: Refactored the order system to unify order types and remove the separate "PreOrder" entity.

**Key Changes**:
- **PreOrder Removal**: Removed `PreOrder` entity and related migrations.
- **OrderType**: Added `OrderType` property to `Order` entity to distinguish between different order types (e.g., standard Order).
- **Order Code Generation**: Added `OrderCodeGenerator` service for generating unique order codes (format: `ORD-timestamp-suffix`).

**Modified/New Files**:
- `AgriConnectMarket.Domain/Entities/Order.cs`: Added `OrderType` property.
- `AgriConnectMarket.Infrastructure/Services/OrderService.cs`: Updated to handle `OrderType` and use `OrderCodeGenerator`.
- `AgriConnectMarket.Infrastructure/Services/OrderCodeGenerator.cs`: New service for generating order codes.
- `AgriConnectMarket.Application/DTOs/RequestDtos/CreateOrderDto.cs`: Added `OrderType` property.
- `AgriConnectMarket.SharedKernel/Constants/OrderType.cs`: Defined order type constants.

## 5. Product Batch Enhancements (Backend)
**Description**: Improvements to product batch creation and retrieval.

**Key Changes**:
- **Image Upload**: `CreateBatchAsync` now supports uploading multiple images to Cloudinary.
- **Rating Calculation**: `MapToDto` now calculates and includes `AverageRating` and `ReviewCount` for each batch based on `FarmReviews`.

**Modified/New Files**:
- `AgriConnectMarket.Infrastructure/Services/ProductBatchService.cs`: Updated creation and mapping logic.
- `AgriConnectMarket.WebApi/Models/CreateProductBatchRequest.cs`: Added `Images` property.
- `AgriConnectMarket.Infrastructure/Services/SqlBatchCodeGenerator.cs`: Updated batch code generation logic.

## 6. Cart System Updates (Backend)
**Description**: Updates to the cart retrieval logic.

**Key Changes**:
- **Detailed Retrieval**: `GetCartByUser` now fetches cart details with more related data (likely including product/batch info).

**Modified Files**:
- `AgriConnectMarket.Infrastructure/Services/CartService.cs`: Updated `GetCartByUser` to use `includeDetails: true`.
- `AgriConnectMarket.Infrastructure/Repositories/CartRepository.cs`: Updated repository methods.

## 7. QR Code & Security Enhancements (Backend)
**Description**: Infrastructure for generating QR codes and handling secure signatures (HMAC/SHA256), likely for product verification.

**New Files**:
- `AgriConnectMarket.Infrastructure/Services/QrCodeGenerator.cs`
- `AgriConnectMarket.Infrastructure/Services/HmacSigner.cs`
- `AgriConnectMarket.Infrastructure/Services/Sha256Hashing.cs`
- `AgriConnectMarket.Infrastructure/Settings/QrSettings.cs`
- `AgriConnectMarket.Application/Interfaces/IQrCodeGenerator.cs`
- `AgriConnectMarket.Application/Interfaces/IHashingStrategy.cs`

## 8. Farm Management Extensions (Backend)
**Description**: Administrative methods added to `FarmService` for managing farm status.

**Modified Files**:
- `AgriConnectMarket.Infrastructure/Services/FarmService.cs`

**Key Changes**:
- Added `ToggleFarmBanned`: To ban/unban a farm.
- Added `AllowForSell`: To approve a farm for selling.
- Added `MarkFarmAsMall`: To designate a farm as a "Mall" farm.

## 9. Infrastructure Updates (Backend)
**Description**: Registration of new services and repositories.

**Modified Files**:
- `AgriConnectMarket.Infrastructure/Data/AppDbContext.cs`: Added `DbSet`s for new entities, removed `PreOrders`.
- `AgriConnectMarket.Infrastructure/Data/UnitOfWork.cs`: Added new repositories.
- `AgriConnectMarket.Infrastructure/Extensions/InfrastructureServiceCollectionExtensions.cs`: Registered new services and repositories for Dependency Injection.
