
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  installments: number;
  imageUrl: string;
  shipping: 'free' | 'full' | 'standard';
  rating: number;
  reviewsCount: number;
  category: string;
  description: string;
  seller: string;
  isCustom?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  name: string;
  city: string;
  avatarColor: string;
  joinedDate: string;
  isLoggedIn: boolean;
  password?: string;
}

export type ViewState = 'store' | 'seller_dashboard' | 'checkout' | 'offers' | 'history' | 'contact' | 'account' | 'tracking' | 'about_us';
