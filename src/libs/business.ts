export interface BusinessItem {
    key: string;
    title: string;
    description?: string;
    background?: string;
    borderColor?: string;
    color?: string;
}

export interface BusinessCategory {
    title: string;
    description?: string;
    children: BusinessItem[];
}

export type BusinessList = BusinessCategory[];