import {useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native'
import {SafeAreaView, useShopNavigation} from '@shopify/shop-minis-platform-sdk'
import {useNavigation} from '@react-navigation/native'
import {ProductCard} from '../types/collection'
import {mockCollectionCards} from '../data/mock-collection'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGamepad, faHeadphones, faShirt} from '@fortawesome/free-solid-svg-icons'

// Get screen dimensions
const {height} = Dimensions.get('window')

interface CategoryHeaderProps {
  title: string
  color: string
}

const CategoryHeader = ({title, color}: CategoryHeaderProps) => {
  const getIcon = () => {
    switch (title) {
      case 'Gaming':
        return faGamepad
      case 'Music':
        return faHeadphones
      case 'Clothing':
        return faShirt
      default:
        return faGamepad
    }
  }

  return (
    <View style={[styles.categoryHeader, {backgroundColor: color}]}>
      <FontAwesomeIcon icon={getIcon()} size={20} color="#FFFFFF" />
      <Text style={styles.categoryHeaderText}>{title}</Text>
    </View>
  )
}

const CategorySection = ({
  title,
  cards,
  onCardPress,
}: {
  title: string
  cards: ProductCard[]
  onCardPress: (card: ProductCard) => void
}) => {
  const getCategoryProps = (title: string): CategoryHeaderProps => {
    switch (title) {
      case 'Gaming':
        return {
          title,
          color: '#FF6B6B',
        }
      case 'Music':
        return {
          title,
          color: '#4ECDC4',
        }
      case 'Clothing':
        return {
          title,
          color: '#45B7D1',
        }
      default:
        return {
          title,
          color: '#666666',
        }
    }
  }

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeaderContainer}>
        <CategoryHeader {...getCategoryProps(title)} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {cards
            .sort((a, b) => (a.isCollected === b.isCollected ? 0 : a.isCollected ? -1 : 1))
            .map(card => (
              <TouchableOpacity
                key={card.id}
                onPress={() => card.isCollected && onCardPress(card)}
                style={[styles.card, !card.isCollected && styles.cardUncollected]}
              >
                <Image
                  source={{uri: card.image}}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
                <Text 
                  style={[styles.cardTitle, !card.isCollected && styles.cardTitleUncollected]} 
                  numberOfLines={1}
                >
                  {card.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

export function CollectionScreen() {
  const navigation = useNavigation()
  const {navigateToProduct, navigateToShop} = useShopNavigation()
  const [selectedCard, setSelectedCard] = useState<ProductCard | null>(null)

  // Mock data with collected and uncollected cards
  const allCards = mockCollectionCards

  const cardsByCategory = {
    gaming: allCards.filter(card => card.category === 'gaming'),
    music: allCards.filter(card => card.category === 'music'),
    clothing: allCards.filter(card => card.category === 'clothing'),
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Shopidex</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CategorySection 
          title="Gaming" 
          cards={cardsByCategory.gaming} 
          onCardPress={setSelectedCard}
        />
        <CategorySection 
          title="Music" 
          cards={cardsByCategory.music} 
          onCardPress={setSelectedCard}
        />
        <CategorySection 
          title="Clothing" 
          cards={cardsByCategory.clothing} 
          onCardPress={setSelectedCard}
        />
      </ScrollView>

      <Modal
        visible={!!selectedCard}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCard(null)}
      >
        {selectedCard && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{uri: selectedCard.image}}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                <Text style={styles.modalSubtitle}>
                  {selectedCard.category} • {selectedCard.rarity}
                </Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigateToProduct({productId: selectedCard.productId})
                      setSelectedCard(null)
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>View Product</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      navigateToShop({
                        shopId: selectedCard.productId,
                        shopName: selectedCard.shopName,
                      })
                      setSelectedCard(null)
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Visit Store</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => setSelectedCard(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.06,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    height: height * 0.94,
    paddingBottom: 16,
  },
  categorySection: {
    height: height * 0.25,
    marginTop: 8,
  },
  categoryHeaderContainer: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  categoryHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  card: {
    width: 130,
    height: height * 0.18,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardUncollected: {
    opacity: 0.5,
  },
  cardImage: {
    width: '100%',
    height: height * 0.12,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardTitleUncollected: {
    color: '#666666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  modalInfo: {
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#666666',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
})
