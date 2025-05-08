export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  specifications: Record<string, string>;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
} 