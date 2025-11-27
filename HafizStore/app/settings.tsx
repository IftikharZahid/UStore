import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LOGIN_KEY = 'user_logged_in';
const STORE_LOGO_KEY = 'store_logo';

const MENU_ITEMS = [
  { id: '1', title: 'Manage Inventory', icon: 'cube', route: '/manage-items' },
  { id: '2', title: 'Settings', icon: 'settings-outline', route: '/app-settings' },
];

export default function Settings() {
  const router = useRouter();
  const [storeLogo, setStoreLogo] = useState<string | null>(null);

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    try {
      const logo = await AsyncStorage.getItem(STORE_LOGO_KEY);
      if (logo) setStoreLogo(logo);
    } catch (error) {
      console.error('Failed to load logo', error);
    }
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(LOGIN_KEY);
      // Clear the entire navigation stack
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace('/login');
    } catch (error) {
      console.error('Failed to clear login state', error);
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace('/login');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={storeLogo ? { uri: storeLogo } : require('../assets/images/icon.png')} 
            style={styles.logo} 
          />
        </View>
      </View>

      {/* Menu Section */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder
              ]}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon as any} size={22} color="#6C63FF" />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#999" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.menuItem, styles.menuItemBorder]} 
            onPress={() => router.push('/about')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="information-circle" size={22} color="#6C63FF" />
              </View>
              <Text style={styles.menuText}>About App</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconCircle, styles.logoutIconCircle]}>
                <Ionicons name="log-out-outline" size={22} color="#FF4444" />
              </View>
              <Text style={styles.logoutText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#E6F2FF',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#e67e22',
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#e67e22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  logoutIconCircle: {
    backgroundColor: '#FFE6E6',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '500',
  },
});
