import {ParamListBase} from '@react-navigation/native'

export interface RootStackParamList extends ParamListBase {
  'GettingStarted.Home': undefined
  'Share': undefined
  'Collection': undefined
  'PackOpening': undefined
  'PackReveal': {
    category: string
    type: 'common' | 'rare' | 'legendary'
  }
}
