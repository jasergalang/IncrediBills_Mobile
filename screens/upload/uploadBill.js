import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const recentUploads = [
  { id: 1, name: 'October Electricity Bill.png', size: '2.5 MB', date: 'Oct 15 at 10:30 AM', status: 'uploaded' },
  { id: 2, name: 'October Electricity Bill.png', size: '2.5 MB', date: 'Oct 15 at 10:30 AM', status: 'uploaded' },
  { id: 3, name: 'October Electricity Bill.png', size: '2.5 MB', date: 'Oct 15 at 10:30 AM', status: 'uploaded' },
  { id: 4, name: 'October Electricity Bill.png', size: '2.5 MB', date: 'Oct 15 at 10:30 AM', status: 'uploading' },
  { id: 5, name: 'October Electricity Bill.png', size: '2.5 MB', date: 'Oct 15 at 10:30 AM', status: 'uploaded' },
];

export default function UploadBill({ route, navigation }) {
  const { category } = route.params;
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Handle image upload
      console.log('Image selected:', result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });

    if (result.type === 'success') {
      // Handle document upload
      console.log('Document selected:', result.uri);
    }
  };

  const removeUpload = (id) => {
    console.log('Remove upload:', id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name} Bill</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Kindly upload your {category.name.toLowerCase()} bill in the section below.
        </Text>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          <Ionicons name="cloud-upload-outline" size={60} color="#999" />
          <Text style={styles.uploadText}>
            Choose a file or upload an image of your bill. You may also drag and drop the file you want to upload.
          </Text>
        </TouchableOpacity>

        {/* Recent Upload Section */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Upload</Text>
          {recentUploads.map((item) => (
            <View key={item.id} style={styles.uploadItem}>
              <View style={styles.uploadLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="image-outline" size={20} color="#666" />
                </View>
                <View style={styles.uploadInfo}>
                  <Text style={styles.uploadName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.uploadMeta}>
                    {item.size} • {item.date}
                  </Text>
                </View>
              </View>
              <View style={styles.uploadRight}>
                {item.status === 'uploaded' ? (
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  </View>
                ) : (
                  <View style={styles.uploadingIcon}>
                    <Ionicons name="time-outline" size={20} color="#FDB022" />
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => removeUpload(item.id)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={16} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
    lineHeight: 18,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#DDD',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    marginBottom: 32,
  },
  uploadText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
    lineHeight: 18,
    maxWidth: 250,
  },
  recentSection: {
    marginTop: 8,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  uploadItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  uploadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  uploadInfo: {
    flex: 1,
  },
  uploadName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  uploadMeta: {
    fontSize: 11,
    color: '#999',
  },
  uploadRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 8,
  },
  uploadingIcon: {
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
});