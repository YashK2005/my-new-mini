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
import {FlatList} from 'react-native'
import {PostCard} from '../components/PostCard'
import {useState, useMemo} from 'react'
import {AddPostModal} from '../components/AddPostModal'
import {NotificationModal} from '../components/NotificationsModal'

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
      cardImage: 'https://cdn.shopify.com/s/files/1/0823/9185/9515/files/n62435299958.jpg?v=1735606736&width=1500',
      cardName: 'Portable Speaker',
    },
    {
      id: '3',
      username: 'FashionableYoungFella',
      message: 'Trading this limited edition clothing card. DM me with offers!',
      cardImage: 'https://cdn.shopify.com/s/files/1/0055/2140/8113/products/image_30b04527-b6bc-4a46-83ca-3ad6e687dec5.heic?v=1673555500&width=1500',
      cardName: 'UWaterloo Hoodie',
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
      cardImage: 'https://cdn.shopify.com/s/files/1/0758/8135/files/71nP616X1hL.jpg?v=1733450873&width=1500',
      cardName: 'Vintage Vinyl',
    },
]

export function ShareScreen() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false)
  const [posts, setPosts] = useState(MOCK_POSTS)

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.cardName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, posts])

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const handleAddPost = () => {
    setIsModalVisible(true)
  }

  const handleSubmitPost = (message: string, cardImage: string, cardName: string) => {
    const newPost =  {
        id: `${posts.length + 1}`,
        username: 'Demo',
        message,
        cardImage,
        cardName,
    }

    setPosts(prevPosts => [newPost, ...prevPosts])
    setIsModalVisible(false)
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
                onPress={() => setIsNotificationModalVisible(true)}
                hapticOnPress
                bounceOnPress
            > 
                <IconButton
                    name="mail"
                    size="m"
                    onPress={() => setIsNotificationModalVisible(true)}
                    accessibilityLabel="Mail"
                />
            </PressableAnimated>
       
            <PressableAnimated
                onPress={handleAddPost}
                hapticOnPress
                bounceOnPress
            >
                <IconButton
                    name="add"
                    size="m"
                    onPress={handleAddPost}
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

        <AddPostModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleSubmitPost}
        />

        <NotificationModal
            isVisible={isNotificationModalVisible}
            onClose={() => setIsNotificationModalVisible(false)}
        />
    </SafeAreaView>
  )
}