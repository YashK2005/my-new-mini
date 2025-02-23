import {
    Text,
    IconButton,
    TextField,
    PressableAnimated,
    Image,
    useTheme,
    KeyboardAvoidingView,
} from '@shopify/shop-minis-platform-sdk'
import {
    Modal, 
    View, 
    TouchableOpacity, 
    Platform, 
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import {useState} from 'react'
import {shareScreenStyles as styles} from '../screens/styles/share-screen.styles'

const HARDCODED_PRODUCT = {
    id: '22',
    name: 'Arcteryx Jacket',
    image: 'https://cdn.shopify.com/s/files/1/0078/0333/8829/files/Arcteryx-Beta-Insulated-Jacket-Men-s_BLKSAPPH_1.png?v=1727998098&format=webp&width=1500',
}

interface AddPostModalProps {
    isVisible: boolean
    onClose: () => void
    onSubmit: (message: string, image: string, name: string) => void
}

export function AddPostModal({isVisible, onClose, onSubmit}: AddPostModalProps) {
    const theme = useTheme()
    const [message, setMessage] = useState('')

    const handleSubmit = () => {
        Keyboard.dismiss()
        onSubmit(message, HARDCODED_PRODUCT.image, HARDCODED_PRODUCT.name)
        setMessage('')
        onClose()
    }

    const handleMessageSubmit = () => {
        if (message.trim()) {
            handleSubmit()
        }
    }

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}
                >
                    <TouchableOpacity 
                        style={styles.modalContainer} 
                        activeOpacity={1}
                        onPress={onClose}
                    >
                        <TouchableOpacity 
                            style={styles.modalContent}
                            activeOpacity={1}
                            onPress={(e) => e.stopPropagation()}
                        >
                            <View style={styles.modalHeader}>
                                <Text variant="headerBold">Create New Post</Text>
                                <IconButton
                                    name="close"
                                    size="m"
                                    onPress={onClose}
                                    accessibilityLabel="Close"
                                />
                            </View>

                            <View style={styles.productContainer}>
                                <Text variant="bodyLargeBold" style={styles.sectionTitle}>
                                    Selected Product:
                                </Text>
                                <View style={styles.productPreview}>
                                    <Image
                                        source={{uri: HARDCODED_PRODUCT.image}}
                                        style={styles.productImage}
                                        resizeMode="cover"
                                    />
                                    <Text variant="bodySmall" style={styles.productName}>
                                        {HARDCODED_PRODUCT.name}
                                    </Text>
                                </View>
                            </View>

                            <TextField
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Write your message..."
                                multiline
                                numberOfLines={4}
                                onSubmitEditing={handleMessageSubmit}
                                returnKeyType="done"
                                blurOnSubmit={true}
                            />

                            <PressableAnimated
                                onPress={handleSubmit}
                                hapticOnPress
                                bounceOnPress
                                disabled={!message.trim()}
                                style={[
                                    styles.submitButton,
                                    {
                                        backgroundColor: message.trim() 
                                            ? 'action-primary'
                                            : 'action-disabled'
                                    }
                                ]}
                            >
                                <Text 
                                    variant="bodyLargeBold" 
                                    color={message.trim() ? 'foregrounds-regular' : 'foregrounds-subdued'}
                                >
                                    Share Post
                                </Text>
                            </PressableAnimated>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}