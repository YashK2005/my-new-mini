export interface ProductCard {
  id: string
  title: string
  image: string
  productId: string
  category: 'music' | 'gaming' | 'clothing'
  isCollected: boolean
  price: string
  description: string
}
