import {useState} from 'react'
import {ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  Box,
  SafeAreaView,
  Text,
  useTheme,
  Divider,
} from '@shopify/shop-minis-platform-sdk'

import {RootStackParamList} from '../types/screens'
import pack from '../assets/packs.jpg'
import binder from '../assets/binder.jpg'
import social from '../assets/social.jpg'

import {FeatureSection} from '../components/FeatureSection'

export function HomeScreen() {
  const theme = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const features = [
    {
      image: pack,
      title: 'Open Pack',
      onPress: () => {}, // edit later
    },
    {
      image: binder,
      title: 'Shopidex',
      onPress: () => navigation.navigate('Collection'),
    },
    {
      image: social,
      title: 'Share',
      onPress: () => navigation.navigate('Share'),
    }
  ]

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        <Box flex={1} justifyContent="center" alignItems="center">
          <Box width="100%" paddingHorizontal="xl" marginTop="xs-s" marginBottom="xs-s" justifyContent="center" alignItems="center">
            <Text variant="headerBold" color="foregrounds-regular">
              Welcome to ShoPacks!
            </Text>
          </Box> 
         
          {features.map((feature, _) => (
            <Box key={feature.title}>
              <Box width="100%" paddingHorizontal="xl">
                <Divider />
              </Box>
              <FeatureSection
                image={feature.image}
                title={feature.title}
                onPress={feature.onPress}
              />
            </Box>
          ))}
        </Box>  
      </ScrollView>
    </SafeAreaView>
  )
}
