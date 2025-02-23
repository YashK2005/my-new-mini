import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {PackOpeningScreen} from '../screens/PackOpeningScreen'
import {HomeScreen} from '../screens/HomeScreen'
import {RootStackParamList} from '../types/screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PackOpening" component={PackOpeningScreen} />
    </Stack.Navigator>
  )
} 