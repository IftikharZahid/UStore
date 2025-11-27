import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutApp() {
  const router = useRouter();

  const handleLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleEmail = () => {
    Linking.openURL('mailto:IftikharXahid@gmail.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+923007971374');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About App</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../assets/images/developer-profile.jpg')} 
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.developerName}>Iftikhar Zahid</Text>
          <Text style={styles.developerTitle}>App Creator</Text>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>About Me</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Professional Bio */}
        <View style={styles.bioSection}>
          <Text style={styles.bioText}>
            I am a <Text style={styles.boldText}>Mobile App Developer & AI Enthusiast</Text>. I build high-quality mobile applications using React Native and explore modern AI solutions.
          </Text>
          
          <Text style={styles.bioText}>
            Contact for your business app, to digitize your business and help it grow and rank online.
          </Text>
          
          <TouchableOpacity 
            style={styles.githubLink}
            onPress={() => handleLink('https://github.com/IftikharZahid')}
          >
            <Ionicons name="logo-github" size={20} color="#6C63FF" />
            <Text style={styles.githubText}>View my projects on GitHub</Text>
          </TouchableOpacity>
        </View>

 {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Contact Here</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Quick Contact Buttons */}
        <View style={styles.quickContactSection}>
          <TouchableOpacity 
            style={styles.quickContactButton}
            onPress={handlePhone}
          >
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickContactButton, styles.whatsappButton]}
            onPress={() => handleLink('https://wa.me/923007971374')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickContactButton, styles.emailButton]}
            onPress={handleEmail}
          >
            <Ionicons name="mail" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickContactButton, styles.facebookButton]}
            onPress={() => handleLink('https://facebook.com/iftikharxahid')}
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickContactButton, styles.websiteButton]}
            onPress={() => handleLink('https://Zahid.codes')}
          >
            <Ionicons name="globe-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    padding: 20,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  developerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  versionTextTop: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  developerTitle: {
    fontSize: 16,
    color: '#666',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  contactSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  quickContactSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  quickContactButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  emailButton: {
    backgroundColor: '#EA4335',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  websiteButton: {
    backgroundColor: '#4CAF50',
  },
  quickContactButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  bioSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bioText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  githubText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
    marginLeft: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
});
