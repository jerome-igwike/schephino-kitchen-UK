# Schephino's Kitchen - Food Ordering App

## Overview
Schephino's Kitchen is a modern food ordering web application for authentic Nigerian cuisine. Built with Next.js 16, it features a beautiful UI with menu browsing, cart management, and integrated Stripe payment processing.

**Current State**: ✅ Fully configured and running in Replit environment
**Last Updated**: November 23, 2025

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.3 (with Turbopack)
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **API Routes**: Next.js API routes

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   │   ├── categories/    # Category management
│   │   └── dashboard/     # Dish management (add/edit)
│   ├── api/               # API routes
│   │   └── stripe/        # Stripe checkout integration
│   ├── cart/              # Shopping cart page
│   ├── contact/           # Contact page
│   ├── success/           # Payment success page
│   ├── layout.js          # Root layout with providers
│   └── page.js            # Home page (menu)
├── components/
│   ├── admin/             # Admin components
│   ├── layout/            # Header, BottomNav
│   └── menu/              # DishCard, DishModal
└── lib/
    ├── CartContext.js     # Global cart state management
    └── supabase.js        # Supabase client configuration
```

## Environment Variables

The following environment variables are configured in the **shared** environment:

### Supabase (Database)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public API key

### Stripe (Payments)
- `STRIPE_SECRET_KEY` - Stripe secret key for server-side operations
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for client-side

### Application
- `NEXT_PUBLIC_BASE_URL` - Base URL for the application (Replit domain)

## Database Schema

The app expects the following Supabase tables:

### `categories`
- `id` (primary key)
- `name` (text)
- Other metadata fields

### `menu_items`
- `id` (primary key)
- `name` (text)
- `image_url` (text)
- `category_id` (foreign key → categories)
- Other dish information

### `product_variants`
- `id` (primary key)
- `price` (decimal)
- `size_label` (text)
- Foreign key relationship to menu_items

## Replit Configuration

### Development Server
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external access through Replit proxy)
- **Command**: `npm run dev`
- **Auto-restart**: Enabled

### Deployment
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Start**: `npm start` (production server on port 5000)

## Key Features

1. **Menu Browsing**: Category-based menu with beautiful dish cards
2. **Shopping Cart**: Global cart context with add/remove functionality
3. **Stripe Checkout**: Secure payment processing with Stripe
4. **Admin Dashboard**: 
   - Add/edit menu items
   - Manage categories
   - Configure product variants (sizes/prices)
5. **Responsive Design**: Mobile-first UI with bottom navigation

## Getting Started

The application is already configured and running. Access it through the Replit webview.

### To add menu items:
1. Navigate to `/admin` in the application
2. Use the dashboard to add categories and dishes

### To test payments:
Use Stripe test card: `4242 4242 4242 4242` with any future expiration date and any CVC.

## Recent Changes

### November 23, 2025 - Mobile-First Responsiveness & Admin Premium Styling ✅
**Final phase: True mobile-first design for 320px+ screens + premium admin pages**

#### Critical Mobile Fixes (320-360px screens)
- ✅ **Search Bar**: Removed sticky positioning on screens below sm breakpoint to prevent clipping on iPhone SE and similar devices
- ✅ **Admin Dashboard**: Changed action buttons to responsive 2-column grid layout with reduced padding (px-3) and smaller text (text-xs) on mobile
- ✅ **Admin Categories**: Vertical stacking form with full-width buttons, reduced header sizes, truncation to prevent overflow
- ✅ **Reduced Padding Across Board**: All inputs and buttons use smaller padding on mobile (px-3, py-3) scaling up on larger screens
- ✅ **Icon Sizing**: Responsive icon sizes (size={16-18} on mobile, scaling up with breakpoints)
- ✅ **Touch Targets**: Maintained minimum 48px height for all interactive elements

#### Admin Pages Premium Transformation
- ✅ **Admin Login**: 
  - Added restaurant logo above lock icon
  - Gradient background (green shades)
  - Premium form styling with focus rings and hover effects
  - Fully mobile-responsive with proper spacing
- ✅ **Admin Dashboard**:
  - Logo integration in header
  - Premium white cards with cream borders
  - Mobile: Card view with full dish information
  - Desktop: Table view with better data organization
  - Responsive action grid (2 columns on mobile, inline on desktop)
  - Gold gradient buttons for primary actions
- ✅ **Admin Categories**:
  - Logo in header with back button
  - Vertical form layout for mobile compatibility
  - Mobile: Card view for categories
  - Desktop: Table view with hover effects
  - Premium styling matching main site aesthetic

#### Responsive Breakpoints Verified
- ✅ 320px (iPhone SE): All elements fit, no horizontal overflow
- ✅ 360px (Small Android): Proper spacing and readability
- ✅ 640px+ (sm): Enhanced layouts with more spacing
- ✅ 768px+ (md): Desktop table views, expanded features
- ✅ 1024px+ (lg): Full desktop experience

### November 23, 2025 - Premium UI Transformation ✅
**Complete redesign to 5-star restaurant branding with mobile-first approach**

#### Header & Navigation
- ✅ Changed header to full-width layout (removed centered container)
- ✅ Integrated real restaurant logo (logo.svg) in header replacing Sparkles icon
- ✅ Updated all cart icons from ShoppingBag to ShoppingCart icon (standard cart symbol)
- ✅ Improved header spacing and mobile responsiveness

#### Logo Integration
- ✅ Copied restaurant logo to public/logo.svg for site-wide use
- ✅ Added logo to header, footer, contact hero section, and success page
- ✅ Consistent branding across all pages

#### Home Page Enhancements
- ✅ Redesigned hero section with mobile-first approach (min-h-[85vh] on mobile, 90vh on desktop)
- ✅ Enhanced hero animation effects with pulsing gradient backgrounds
- ✅ Improved responsive typography (text-4xl on mobile, up to text-7xl on desktop)
- ✅ Redesigned stats display as a responsive 3-column grid
- ✅ Enhanced feature cards with better hover effects and premium styling
- ✅ Improved button designs with active states and better mobile sizing
- ✅ Optimized search bar with mobile-responsive sticky positioning

#### Cart Page
- ✅ Updated empty cart icon to ShoppingCart
- ✅ Maintained premium checkout UI with consistent styling

#### Contact Page
- ✅ Added logo to hero section
- ✅ Enhanced card styling with premium borders and hover effects
- ✅ Improved mobile responsiveness across all contact cards

#### Success Page
- ✅ Integrated logo at top of success confirmation
- ✅ Enhanced animation effects and visual hierarchy
- ✅ Improved premium feel with refined motion design

#### Footer
- ✅ Added logo integration for consistent branding
- ✅ Enhanced footer styling to match 5-star aesthetic

#### Mobile Optimization
- ✅ All pages now mobile-first with responsive breakpoints
- ✅ Improved touch targets and spacing for mobile users
- ✅ Enhanced typography scaling across device sizes
- ✅ Better component stacking on small screens

### November 23, 2025 - Replit Environment Setup ✅
- Installed all npm dependencies (382 packages)
- Configured Next.js for Replit environment:
  - Set up cache control headers to prevent browser caching issues
  - Configured `allowedDevOrigins` for Replit proxy compatibility
  - Server bound to port 5000 on 0.0.0.0 for webview access
- Set up environment variables:
  - NEXT_PUBLIC_BASE_URL (Replit dev domain)
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - STRIPE_SECRET_KEY (secret)
- Configured development workflow:
  - Command: `npm run dev`
  - Port: 5000
  - Output: webview
- Configured deployment for autoscale:
  - Build: `npm run build`
  - Run: `npm start`
- Verified application runs without errors

## Notes

- The application uses Next.js App Router (not Pages Router)
- Cart state is managed globally via React Context
- All API routes are in `src/app/api/`
- Styling uses Tailwind CSS with custom color scheme (green/gold theme)
