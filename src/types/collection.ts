export interface ProductCard {
  id: string
  title: string
  cardImage: number
  productImage: string
  productId: string
  category: 'music' | 'gaming' | 'clothing'
  isCollected: boolean
  price: string
  description: string
}
