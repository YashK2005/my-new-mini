import {useState, useMemo} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native'
import {
  SafeAreaView,
  useShopNavigation,
} from '@shopify/shop-minis-platform-sdk'
import {useNavigation} from '@react-navigation/native'
import {ProductCard} from '../types/collection'
import {mockCollectionCards} from '../data/mock-collection'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGamepad, faHeadphones, faShirt} from '@fortawesome/free-solid-svg-icons'
import {collectionScreenStyles as styles} from './styles/collection-screen.styles'
import {useCollectedCards} from '../hooks/useCollectedCards'


interface CategoryHeaderProps {
  title: string
  color: string
  collectedCount: number
  totalCount: number
}

const CategoryHeader = ({title, color, collectedCount, totalCount}: CategoryHeaderProps) => {
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
      <View style={styles.categoryHeaderLeft}>
        <FontAwesomeIcon icon={getIcon()} size={20} color="#FFFFFF" />
        <Text style={styles.categoryHeaderText}>{title}</Text>
      </View>
      <Text style={styles.categoryHeaderCounter}>
        {collectedCount}/{totalCount}
      </Text>
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
  const collectedCount = cards.filter(card => card.isCollected).length
  const totalCount = cards.length

  const getCategoryProps = (title: string): CategoryHeaderProps => {
    switch (title) {
      case 'Gaming':
        return {
          title,
          color: '#FF6B6B',
          collectedCount,
          totalCount,
        }
      case 'Music':
        return {
          title,
          color: '#4ECDC4',
          collectedCount,
          totalCount,
        }
      case 'Clothing':
        return {
          title,
          color: '#45B7D1',
          collectedCount,
          totalCount,
        }
      default:
        return {
          title,
          color: '#666666',
          collectedCount,
          totalCount,
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
                  source={{uri: card.productImage}}
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
  const {navigateToProduct} = useShopNavigation()
  const [selectedCard, setSelectedCard] = useState<ProductCard | null>(null)
  const {collectedCardIds, clearCollectedCards} = useCollectedCards()

  // Modify allCards to include isCollected based on collectedCardIds
  const allCards = useMemo(() => {
    // clearCollectedCards()
    return mockCollectionCards.map(card => ({
      ...card,
      isCollected: collectedCardIds.includes(card.id)
    }))
  }, [collectedCardIds])

  const cardsByCategory = {
    gaming: allCards.filter(card => card.category === 'gaming'),
    music: allCards.filter(card => card.category === 'music'),
    clothing: allCards.filter(card => card.category === 'clothing'),
  }

  const totalCollected = Object.values(cardsByCategory)
    .flat()
    .filter(card => card.isCollected).length
  
  const totalCards = Object.values(cardsByCategory).flat().length

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Shopidex</Text>
          </View>
          <Text style={styles.headerCounter}>
            {totalCollected}/{totalCards}
          </Text>
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
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedCard(null)}
        >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1}
            onPress={() => setSelectedCard(null)}
          >
            <TouchableOpacity 
              style={styles.cardModal}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {selectedCard && (
                <>
                  <Image
                    source={selectedCard.cardImage}
                    style={styles.cardModalImage}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigateToProduct({productId: selectedCard.productId})
                      setSelectedCard(null)
                    }}
                    style={styles.cardModalButton}
                  >
                    <Text style={styles.cardModalButtonText}>View Product</Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
  )
}
