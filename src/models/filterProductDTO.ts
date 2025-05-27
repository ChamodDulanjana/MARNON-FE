export interface FilterProductDTO {
    sortBy: 'newest' | 'priceLowToHigh' | 'priceHighToLow' | 'popularity';
    size?: string | null; // Optional, can be null
    color?: string | null; // Optional, can be null
    categoryName?: 'men' | 'women' | 'kid' | null; // Optional, can be null
}