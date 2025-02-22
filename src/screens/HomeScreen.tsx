import {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  Box,
  SafeAreaView,
  Text,
  PressableAnimated,
  useTheme,
  Image,
  Avatar,
  Divider,
} from '@shopify/shop-minis-platform-sdk'

import {RootStackParamList} from '../types/screens'
import { homeScreenStyles as styles } from './styles/home-screen.styles'
import pack from '../assets/packs.jpg'

export function HomeScreen() {
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <ScrollView>
        <Box flex={1} justifyContent="center" alignItems="center">
          <PressableAnimated
            onPress={() => {}}
            style={styles.packButton}
            hapticOnPress
            bounceOnPress
          >
            <Image
              source={pack}
              style={styles.packImage}
              resizeMode="contain"
            />
          </PressableAnimated>
          
          <Text variant="headerBold" marginTop="xs-s">
            Open Pack
          </Text>

          <Box width="100%" paddingHorizontal="xl" marginTop="xs">
            <Divider />
          </Box>
        </Box>  
      </ScrollView>
    </SafeAreaView>
  )
}