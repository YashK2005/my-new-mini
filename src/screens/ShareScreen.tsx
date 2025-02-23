import {
    Box, 
    SafeAreaView,
    Text, 
    IconButton, 
    PressableAnimated, 
    useTheme,
    TextField,
    Icon,
} from '@shopify/shop-minis-platform-sdk'
import {useNavigation} from '@react-navigation/native'
import {ScrollView, FlatList} from 'react-native'
import {PostCard} from '../components/PostCard'
import {useState, useMemo} from 'react'
import {shareScreenStyles as styles} from './styles/share-screen.styles'

const MOCK_POSTS = [
    {
      id: '1',
      username: 'CardCollector123Pokemon',
      message: 'Looking to trade this rare gaming card! Anyone interested?',
      cardImage: 'https://cdn.shopify.com/s/files/1/0092/3828/2340/products/gtracing-gaming-headset-k8-ru01-blue-28873025224784.jpg?v=1695609592&width=1500',
      cardName: 'Gaming Headset',
    },
    {
      id: '2',
      username: 'MusicLoverOnlyDrake',
      message: 'Got an extra speaker card. Want to trade for any music equipment card!',
      cardImage: 'https://cdn.shopify.com/example/speaker.jpg',
      cardName: 'Portable Speaker',
    },
    {
      id: '3',
      username: 'FashionableYoungFella',
      message: 'Trading this limited edition clothing card. DM me with offers!',
      cardImage: 'https://cdn.shopify.com/example/jacket.jpg',
      cardName: 'Designer Jacket',
    },
    {
      id: '4',
      username: 'TechGuru123IGotMoney',
      message: 'Anyone want to trade for this awesome gaming accessory?',
      cardImage: 'https://cdn.shopify.com/s/files/1/0573/6962/4713/files/STORM_M808_BLACK_1_1280x960_1fbcaf49-db89-4c20-815a-92df2102d83f.jpg?v=1707242509&width=1500',
      cardName: 'Gaming Mouse',
    },
    {
      id: '5',
      username: 'VinylKingPleaseEminem',
      message: 'Rare vinyl card up for trade! Looking for other music cards.',
      cardImage: 'https://cdn.shopify.com/example/vinyl.jpg',
      cardName: 'Vintage Vinyl',
    },
]

export function ShareScreen() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => 
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.cardName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}>
            <Box flexDirection="row" padding="m" paddingBottom="xs" alignItems="center" justifyContent="space-between">
                    <IconButton
                    name="arrow-left"
                    size="m"
                    onPress={() => navigation.goBack()}
                    accessibilityLabel="Go back"
                    />
                    <Text variant="headerBold" marginLeft="m">Share</Text>
                    <PressableAnimated
                        onPress={() => {}}
                        hapticOnPress
                        bounceOnPress
                    >
                        <IconButton
                            name="add"
                            size="m"
                            onPress={() => {}}
                            accessibilityLabel="Add"
                        />
                    </PressableAnimated>
            </Box>

        <Box padding="m" paddingTop="xs">
            <TextField
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search posts..."
                trailingComponent={<Icon name="search" />}
            />
        </Box>

        <FlatList
            data={filteredPosts}
            renderItem={({item}) => (
                <PostCard
                    username={item.username}
                    message={item.message}
                    cardImage={item.cardImage}
                    cardName={item.cardName}
                    onPress={() => {}}
                />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={() =>(
                <Box padding="m" alignItems="center">
                    <Text variant="bodyLargeBold" color="foregrounds-regular">
                        No posts found
                    </Text>
                </Box>
            )}
        />
    </SafeAreaView>
  )
}