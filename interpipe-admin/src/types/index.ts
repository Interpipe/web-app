export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  sizes: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  category: Category;
  categoryId: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  order: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  icon: string;
  order: number;
} 