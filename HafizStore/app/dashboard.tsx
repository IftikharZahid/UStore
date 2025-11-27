import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Item {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: '1', name: 'Rice (Basmati)', price: 'Rs. 20', stock: '50 kg', category: 'Grains' },
  { id: '2', name: 'Sugar', price: 'Rs. 5', stock: '100 kg', category: 'Essentials' },
  { id: '3', name: 'Cooking Oil', price: 'Rs. 15', stock: '30 L', category: 'Essentials' },
  { id: '4', name: 'Wheat Flour', price: 'Rs. 10', stock: '80 kg', category: 'Grains' },
  { id: '5', name: 'Salt', price: 'Rs. 1', stock: '200 pkts', category: 'Essentials' },
  { id: '6', name: 'Tea Leaves', price: 'Rs. 8', stock: '40 boxes', category: 'Beverages' },
  { id: '7', name: 'Milk (UHT)', price: 'Rs. 2', stock: '60 L', category: 'Dairy' },
  { id: '8', name: 'Eggs', price: 'Rs. 4', stock: '30 doz', category: 'Dairy' },
  { id: '9', name: 'Bread', price: 'Rs. 3', stock: '20 loaves', category: 'Bakery' },
  { id: '10', name: 'Butter', price: 'Rs. 6', stock: '15 kg', category: 'Dairy' },
  { id: '11', name: 'Lentils (Masoor)', price: 'Rs. 4', stock: '40 kg', category: 'Grains' },
  { id: '12', name: 'Chickpeas', price: 'Rs. 3', stock: '35 kg', category: 'Grains' },
  { id: '13', name: 'Spices Mix', price: 'Rs. 5', stock: '50 pkts', category: 'Spices' },
  { id: '14', name: 'Dish Soap', price: 'Rs. 3', stock: '25 bottles', category: 'Household' },
  { id: '15', name: 'Laundry Detergent', price: 'Rs. 12', stock: '20 bags', category: 'Household' },
  { id: '16', name: 'Toothpaste', price: 'Rs. 4', stock: '40 tubes', category: 'Personal Care' },
  { id: '17', name: 'Shampoo', price: 'Rs. 8', stock: '15 bottles', category: 'Personal Care' },
  { id: '18', name: 'Soap Bar', price: 'Rs. 1', stock: '100 bars', category: 'Personal Care' },
  { id: '19', name: 'Biscuits', price: 'Rs. 2', stock: '60 pkts', category: 'Snacks' },
  { id: '20', name: 'Juice', price: 'Rs. 5', stock: '30 L', category: 'Beverages' },
];

const STORAGE_KEY = 'store_items';

export default function Dashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState('Hafiz Store');
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [storeTagline, setStoreTagline] = useState('Your trusted store');
  const [titleColor, setTitleColor] = useState('#000000');
  const [titleSize, setTitleSize] = useState(22);

  const loadStoreInfo = useCallback(async () => {
    try {
      const [name, logo, tagline, color, size] = await Promise.all([
        AsyncStorage.getItem('store_name'),
        AsyncStorage.getItem('store_logo'),
        AsyncStorage.getItem('store_tagline'),
        AsyncStorage.getItem('title_color'),
        AsyncStorage.getItem('title_size'),
      ]);
      if (name) setStoreName(name);
      if (logo) setStoreLogo(logo);
      if (tagline) setStoreTagline(tagline);
      if (color) setTitleColor(color);
      if (size) setTitleSize(Number(size));
    } catch (error) {
      console.error('Failed to load store info', error);
    }
  }, []);

  const loadItems = useCallback(async () => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
        setItems(INITIAL_ITEMS);
      }
    } catch (error) {
      console.error('Failed to load items', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
    loadStoreInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
      loadStoreInfo();
    }, [])
  );

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { flex: 2 }]}>Item Name</Text>
      <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Price</Text>
      <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>Unit Price</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.rowText, { flex: 2, fontWeight: '500' }]}>{item.name}</Text>
      <Text style={[styles.rowText, { flex: 1, textAlign: 'center', color: '#666' }]}>{item.price}</Text>
      <Text style={[styles.rowText, { flex: 1, textAlign: 'right', color: '#6C63FF' }]}>{item.stock}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.storeInfo} 
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
        >
          <Image 
            source={storeLogo ? { uri: storeLogo } : require('../assets/images/icon.png')} 
            style={styles.logoSmall} 
          />
          <View style={styles.storeTitleContainer}>
            <Text style={[styles.storeTitle, { color: titleColor, fontSize: titleSize, textAlign: 'center' }]}>
              {storeName}
            </Text>
            <Text style={styles.storeTagline}>{storeTagline}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Inventory List</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.tableContainer}>
            {renderHeader()}
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No items found</Text>
              }
            />
          </View>
        )}
      </View>
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
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  storeTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  storeTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  storeTagline: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 15,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#999',
    fontSize: 16,
  },
});
