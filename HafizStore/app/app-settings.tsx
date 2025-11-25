import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORE_NAME_KEY = 'store_name';
const STORE_LOGO_KEY = 'store_logo';
const STORE_TAGLINE_KEY = 'store_tagline';
const TITLE_COLOR_KEY = 'title_color';
const TITLE_SIZE_KEY = 'title_size';

const COLOR_OPTIONS = [
  { label: 'Black', value: '#000000' },
  { label: 'Blue', value: '#003366' },
  { label: 'Purple', value: '#6C63FF' },
  { label: 'Green', value: '#00B894' },
  { label: 'Red', value: '#FF7675' },
];

const SIZE_OPTIONS = [
  { label: 'Small', value: 18 },
  { label: 'Medium', value: 22 },
  { label: 'Large', value: 26 },
  { label: 'Extra Large', value: 30 },
];

export default function AppSettings() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('Hafiz Store');
  const [storeTagline, setStoreTagline] = useState('Your trusted store');
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [titleColor, setTitleColor] = useState('#000000');
  const [titleSize, setTitleSize] = useState(22);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  
  const [tempStoreName, setTempStoreName] = useState('');
  const [tempTagline, setTempTagline] = useState('');

  useEffect(() => {
    loadStoreData();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access photos');
    }
  };

  const loadStoreData = async () => {
    try {
      const [name, logo, tagline, color, size] = await Promise.all([
        AsyncStorage.getItem(STORE_NAME_KEY),
        AsyncStorage.getItem(STORE_LOGO_KEY),
        AsyncStorage.getItem(STORE_TAGLINE_KEY),
        AsyncStorage.getItem(TITLE_COLOR_KEY),
        AsyncStorage.getItem(TITLE_SIZE_KEY),
      ]);
      
      if (name) setStoreName(name);
      if (logo) setStoreLogo(logo);
      if (tagline) setStoreTagline(tagline);
      if (color) setTitleColor(color);
      if (size) setTitleSize(Number(size));
    } catch (error) {
      console.error('Failed to load store data', error);
    }
  };

  const handlePickLogo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const logoUri = result.assets[0].uri;
        await AsyncStorage.setItem(STORE_LOGO_KEY, logoUri);
        setStoreLogo(logoUri);
        Alert.alert('Success', 'Logo updated successfully');
      }
    } catch (error) {
      console.error('Failed to pick logo', error);
      Alert.alert('Error', 'Failed to update logo');
    }
  };

  const handleEditName = () => {
    setTempStoreName(storeName);
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (tempStoreName.trim()) {
      try {
        await AsyncStorage.setItem(STORE_NAME_KEY, tempStoreName.trim());
        setStoreName(tempStoreName.trim());
        setIsEditingName(false);
        Alert.alert('Success', 'Store name updated successfully');
      } catch (error) {
        console.error('Failed to save store name', error);
        Alert.alert('Error', 'Failed to update store name');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setTempStoreName('');
  };

  const handleEditTagline = () => {
    setTempTagline(storeTagline);
    setIsEditingTagline(true);
  };

  const handleSaveTagline = async () => {
    if (tempTagline.trim()) {
      try {
        await AsyncStorage.setItem(STORE_TAGLINE_KEY, tempTagline.trim());
        setStoreTagline(tempTagline.trim());
        setIsEditingTagline(false);
        Alert.alert('Success', 'Tagline updated successfully');
      } catch (error) {
        console.error('Failed to save tagline', error);
        Alert.alert('Error', 'Failed to update tagline');
      }
    }
  };

  const handleCancelTaglineEdit = () => {
    setIsEditingTagline(false);
    setTempTagline('');
  };

  const handleColorChange = async (color: string) => {
    try {
      await AsyncStorage.setItem(TITLE_COLOR_KEY, color);
      setTitleColor(color);
    } catch (error) {
      console.error('Failed to save title color', error);
    }
  };

  const handleSizeChange = async (size: number) => {
    try {
      await AsyncStorage.setItem(TITLE_SIZE_KEY, size.toString());
      setTitleSize(size);
    } catch (error) {
      console.error('Failed to save title size', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Store Logo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Logo</Text>
          <TouchableOpacity style={styles.logoContainer} onPress={handlePickLogo}>
            {storeLogo ? (
              <Image source={{ uri: storeLogo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Ionicons name="image-outline" size={40} color="#999" />
              </View>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.helperText}>Tap to change store logo</Text>
        </View>

        {/* Store Name Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Name</Text>
          {isEditingName ? (
            <View>
              <TextInput
                style={styles.input}
                value={tempStoreName}
                onChangeText={setTempStoreName}
                placeholder="Enter store name"
                autoFocus
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.displayRow} onPress={handleEditName}>
              <Text style={styles.displayText}>{storeName}</Text>
              <Ionicons name="create-outline" size={20} color="#6C63FF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Store Tagline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Tagline</Text>
          {isEditingTagline ? (
            <View>
              <TextInput
                style={styles.input}
                value={tempTagline}
                onChangeText={setTempTagline}
                placeholder="Enter tagline"
                autoFocus
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTaglineEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveTagline}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.displayRow} onPress={handleEditTagline}>
              <Text style={styles.displayText}>{storeTagline}</Text>
              <Ionicons name="create-outline" size={20} color="#6C63FF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Title Color Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title Color</Text>
          <View style={styles.colorOptions}>
            {COLOR_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.colorOption,
                  { backgroundColor: option.value },
                  titleColor === option.value && styles.selectedColor
                ]}
                onPress={() => handleColorChange(option.value)}
              >
                {titleColor === option.value && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title Size</Text>
          <View style={styles.sizeOptions}>
            {SIZE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sizeOption,
                  titleSize === option.value && styles.selectedSize
                ]}
                onPress={() => handleSizeChange(option.value)}
              >
                <Text
                  style={[
                    styles.sizeOptionText,
                    titleSize === option.value && styles.selectedSizeText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  logoContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6C63FF',
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#E0E0E0',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6C63FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  helperText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  displayText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#6C63FF',
  },
  sizeOptions: {
    gap: 10,
  },
  sizeOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedSize: {
    backgroundColor: '#F0EBFF',
    borderColor: '#6C63FF',
  },
  sizeOptionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedSizeText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
});
