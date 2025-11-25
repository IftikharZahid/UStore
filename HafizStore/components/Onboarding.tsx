import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const LOGIN_KEY = 'user_logged_in';

const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'Discover Trends',
        description: 'Explore the latest fashion and lifestyle trends curated just for you.',
        icon: 'compass-outline',
        color: '#6C63FF',
    },
    {
        id: '2',
        title: 'Swift Delivery',
        description: 'Experience lightning-fast shipping with real-time tracking updates.',
        icon: 'flash-outline',
        color: '#00B894',
    },
    {
        id: '3',
        title: 'Secure Checkout',
        description: 'Shop with confidence using our encrypted and secure payment options.',
        icon: 'shield-checkmark-outline',
        color: '#FF7675',
    },
];

export default function Onboarding() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const isLoggedIn = await AsyncStorage.getItem(LOGIN_KEY);
            if (isLoggedIn === 'true') {
                router.replace('/dashboard');
            }
        } catch (error) {
            console.error('Failed to check login status', error);
        }
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            router.replace('/login');
        }
    };

    const handleSkip = () => {
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={ONBOARDING_DATA}
                renderItem={({ item }) => <ScreenContent data={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                bounces={false}
            />

            <SafeAreaView style={styles.controlsOverlay} pointerEvents="box-none">
                <BottomControls
                    onNext={handleNext}
                    onSkip={handleSkip}
                    isLast={currentIndex === ONBOARDING_DATA.length - 1}
                />
            </SafeAreaView>
        </View>
    );
}

function ScreenContent({ data }: any) {
    return (
        <View style={[styles.contentContainer, { backgroundColor: data.color }]}>
            <View style={styles.iconCircle}>
                <Ionicons name={data.icon} size={80} color={data.color} />
            </View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
        </View>
    );
}

function BottomControls({ onNext, onSkip, isLast }: any) {
    const scale = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <View style={styles.bottomContainer}>
            <View style={styles.skipContainer}>
                {!isLast && (
                    <TouchableOpacity onPress={onSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Animated.View style={[styles.nextButtonWrapper, animatedButtonStyle]}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={onNext}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.9}
                >
                    <Text style={styles.nextText}>{isLast ? 'Get Started' : 'Next'}</Text>
                    <Ionicons name={isLast ? "checkmark" : "arrow-forward"} size={20} color="#333" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    contentContainer: {
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    controlsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 20,
        height: 100,
    },
    skipContainer: {
        minWidth: 60,
    },
    skipText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        opacity: 0.8,
    },
    nextButtonWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    nextButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 40,
        alignItems: 'center',
    },
    nextText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginRight: 8,
    },
});
