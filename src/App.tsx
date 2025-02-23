import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {HomeScreen} from './screens/HomeScreen'
import {ShareScreen} from './screens/ShareScreen'
import {CollectionScreen} from './screens/CollectionScreen'
import {PackOpeningScreen} from './screens/PackOpeningScreen'

const Stack = createNativeStackNavigator()

export function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GettingStarted.Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackOpening"
        component={PackOpeningScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
