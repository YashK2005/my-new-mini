import {useState} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {
  Box,
  SafeAreaView,
  Text,
  useTheme,
  Image,
  PressableAnimated,
  IconButton,
} from '@shopify/shop-minis-platform-sdk'
import Carousel from 'react-native-reanimated-carousel'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../types/screens'

interface Pack {
  id: string;
  image: any;
  name: string;
  category: "gaming" | "music" | "clothing";
  type: 'common' | 'rare' | 'legendary';
  quantity: number;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PackOpening'>;

export function PackOpeningScreen() {
  const theme = useTheme()
  const width = Dimensions.get('window').width
  const navigation = useNavigation<NavigationProp>()
  
  const [packs] = useState<Pack[]>([
    { 
      id: '1', 
      image: require('../assets/packs/gaming_pack.png'), 
      name: 'Shop Gaming Pack',
      category: 'gaming',
      type: 'legendary',
      quantity: 2
    },
    { 
      id: '2', 
      image: require('../assets/packs/music_pack.png'), 
      name: 'Shop Music Pack',
      category: 'music',
      type: 'rare',
      quantity: 1
    },
    { 
      id: '3', 
      image: require('../assets/packs/clothing_pack.png'), 
      name: 'Shop Fashion Pack',
      category: 'clothing',
      type: 'rare',
      quantity: 3
    },
  ])

  const uniquePacksOwned = packs.filter(pack => pack.quantity > 0).length
  const totalPackTypes = packs.length

  const handleOpenPack = (pack: Pack) => {
    if (pack.quantity > 0) {
      navigation.navigate('PackReveal', {
        category: pack.category,
        type: pack.type
      })
    }
  }

  const renderPackCard = ({item}: {item: Pack}) => (
    <Box style={styles.packCard}>
      <Text style={styles.packName}>{item.name}</Text>    
      <Image
        source={item.image}
        style={styles.packImage}
        resizeMode="contain"
      />
      <View style={styles.packInfo}>
        {/* <Text style={styles.packQuantity}>Quantity: {item.quantity}</Text> */}
        <PressableAnimated
          onPress={() => handleOpenPack(item)}
          style={[
            styles.openButton,
            {
              backgroundColor: '#4AA9FF',
              opacity: item.quantity > 0 ? 1 : 0.5,
            }
          ]}
          disabled={item.quantity === 0}
        >
          <Text style={styles.openButtonText}>
            {item.quantity > 0 ? 'Open Pack' : 'No Packs Available'}
          </Text>
        </PressableAnimated>
      </View>
    </Box>
  )

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: '#F8F8F8'}]}
    >
      <View style={styles.header}>
        <IconButton
          name="reverse"
          onPress={() => navigation.goBack()}
          size="m"
          accessibilityLabel="Go back"
        />
        <Text style={styles.headerText}>Your Packs</Text>
        <Text style={styles.headerCounter}>
          {uniquePacksOwned}/{totalPackTypes}
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          data={packs}
          loop={false}
          renderItem={renderPackCard}
          width={width}
          height={width * 1.5}
          mode="horizontal-stack"
          modeConfig={{
            snapDirection: 'left',
            stackInterval: 25,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerCounter: {
    fontSize: 16,
    fontWeight: '600',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    overflow: 'visible',
  },
  packCard: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 16,
    height: '95%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packImage: {
    width: '100%',
    height: '55%',
    marginVertical: 16,
  },
  packInfo: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  packName: {
    fontSize: 28,
    marginTop: 20,
    paddingTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  packQuantity: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  openButton: {
    width: '80%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
}) 
