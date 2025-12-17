export interface Category {
    _id: string;
    name: string;
    uiLabel: string;
    slug: string;
    description?: string;
    icon?: string;
    priority?: number;
    isActive?: boolean;
    meta?: {
        title?: string;
        description?: string;
        keywords?: string[] | string; // Handle both array (DB) and string (Form) if needed, though strictly DB is string[]
        ogImage?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface Content {
    _id: string;
    title: string;
    slug: string;
    type: 'news' | 'biography' | 'story' | 'episode';
    categoryId: string | Category; // Population
    author?: string;
    coverImage?: string;
    published: boolean;
    tags?: string[];
    blocks?: any[]; // Define Block interface if available
    meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
        ogImage?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}
