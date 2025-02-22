import {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {
  Box,
  SafeAreaView,
  Text,
  PressableAnimated,
  useTheme,
  Grid,
  Image,
  useShopNavigation,
} from '@shopify/shop-minis-platform-sdk'

// We'll define this type in a separate file
interface ProductCard {
  id: string
  title: string
  image: string
  productId: string
  shopId: string
  category: 'music' | 'gaming' | 'clothing'
  rarity: 'common' | 'rare' | 'ultra-rare'
}

export function CollectionScreen() {
  const theme = useTheme()
  const {navigateToProduct, navigateToShop} = useShopNavigation()
  const [selectedCard, setSelectedCard] = useState<ProductCard | null>(null)

  // Mock data - replace with real data later
  const collectionCards: ProductCard[] = [
    {
      id: '1',
      title: 'Gaming Headset',
      image:
        'https://cdn.shopify.com/s/files/1/0092/3828/2340/products/gtracing-gaming-headset-k8-ru01-blue-28873025224784.jpg?v=1695609592&width=1500',
      productId: 'gid://shopify/Product/6597836308560',
      shopId: 'gid://shopify/Shop/ed40k8h9xa',
      category: 'gaming',
      rarity: 'rare',
    },
    // Add more mock items...
  ]

  const handleCardPress = (card: ProductCard) => {
    setSelectedCard(card)
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <Box flex={1}>
        <Box padding="m">
          <Text variant="bodyLarge">My Collection</Text>
        </Box>

        {selectedCard ? (
          <Box flex={1} padding="m">
            <Box
              style={styles.cardDetail}
              // backgroundColor="surfaceSecondary"
            >
              <Image
                source={{uri: selectedCard.image}}
                style={styles.cardDetailImage}
                resizeMode="contain"
              />
              <Box padding="m">
                <Text variant="bodyLarge">{selectedCard.title}</Text>
                <Text variant="bodyLarge">
                  {selectedCard.category} • {selectedCard.rarity}
                </Text>

                <Box flexDirection="row" gap="s" marginTop="m">
                  <PressableAnimated
                    onPress={() =>
                      navigateToProduct({productId: selectedCard.productId})
                    }
                    style={styles.button}
                    hapticOnPress
                  >
                    <Text variant="bodyLarge">View Product</Text>
                  </PressableAnimated>

                  <PressableAnimated
                    onPress={() =>
                      navigateToShop({
                        shopId: selectedCard.shopId,
                        shopName: 'test',
                      })
                    }
                    // onPress={() => null}
                    style={styles.button}
                    hapticOnPress
                  >
                    <Text variant="bodyLarge">Visit Store</Text>
                  </PressableAnimated>
                </Box>
              </Box>
            </Box>

            <PressableAnimated
              onPress={() => setSelectedCard(null)}
              style={styles.backButton}
              hapticOnPress
            >
              <Text variant="bodyLarge">Back to Collection</Text>
            </PressableAnimated>
          </Box>
        ) : (
          <ScrollView>
            <Grid
              data={collectionCards}
              numColumns={2}
              renderItem={({item}) => (
                <PressableAnimated
                  onPress={() => handleCardPress(item)}
                  style={styles.card}
                  hapticOnPress
                >
                  <Image
                    source={{uri: item.image}}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                  <Text variant="bodyLarge" numberOfLines={1}>
                    {item.title}
                  </Text>
                </PressableAnimated>
              )}
            />
          </ScrollView>
        )}
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  cardDetail: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardDetailImage: {
    width: '100%',
    height: 300,
  },
  button: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
})
