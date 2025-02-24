import {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Dimensions, Image} from 'react-native'
import {
  SafeAreaView,
  Text,
  IconButton
} from '@shopify/shop-minis-platform-sdk'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'
import {mockCollectionCards} from '../data/mock-collection'
import {ProductCard as ProductCardType} from '../types/collection'
import Carousel from 'react-native-reanimated-carousel'
import {RootStackParamList} from '../types/screens'
import {useCollectedCards} from '../hooks/useCollectedCards'


type PackRevealScreenRouteProp = RouteProp<RootStackParamList, 'PackReveal'>

export function PackRevealScreen() {
  const navigation = useNavigation()
  const route = useRoute<PackRevealScreenRouteProp>()
  const {category, type} = route.params
  const [revealedCards, setRevealedCards] = useState<ProductCardType[]>([])
  const {addCollectedCard, collectedCardIds} = useCollectedCards()
  const hasAddedCards = useRef(false)

  useEffect(() => {
    if (hasAddedCards.current) return
    
    const availableCards = mockCollectionCards.filter(card => 
      card.category === category && !collectedCardIds.includes(card.id)
    )
    
    const numCards = type === 'legendary' ? 4 : type === 'rare' ? 3 : 2
    const numCardsToSelect = Math.min(numCards, availableCards.length)
    
    const selectedCards = [...availableCards]
      .sort(() => Math.random() - 0.5)
      .slice(0, numCardsToSelect)
    
    setRevealedCards(selectedCards)
    
    selectedCards.forEach(card => {
      addCollectedCard(card.id)
    })

    hasAddedCards.current = true
  }, [category, type, collectedCardIds])

  const width = Dimensions.get('window').width

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <IconButton
            name="reverse"
            onPress={() => navigation.goBack()}
            size="m"
            accessibilityLabel="Go back"
          />
          <Text style={styles.headerText}>Your New Cards!</Text>
          <View style={{width: 40}} />
        </View>

        <View style={styles.content}>
          {revealedCards.length > 0 ? (
            <Carousel
              data={revealedCards}
              renderItem={({item}) => (
                <Image 
                  source={item.cardImage}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              )}
              width={width}
              height={width * 1.5}
              loop={false}
              autoPlay={false}
            />
          ) : (
            <Text>Loading cards...</Text>
          )}
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  }
}) 
