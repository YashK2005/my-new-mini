export interface ProductCard {
  id: string
  title: string
  image: string
  productId: string
  shopId: string
  category: 'music' | 'gaming' | 'clothing'
  rarity: 'common' | 'rare' | 'ultra-rare'
}
