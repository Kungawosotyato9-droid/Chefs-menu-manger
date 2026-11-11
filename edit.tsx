import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useMenu } from '@/context/MenuContext';
import type { Course } from '@/types/menu';

export default function EditItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { menuItems, updateMenuItem } = useMenu();

  const existingItem = menuItems.find((item) => item.id === id);

  const [name, setName] = useState(existingItem?.name ?? '');
  const [description, setDescription] = useState(existingItem?.description ?? '');
  const [price, setPrice] = useState(existingItem?.price.toString() ?? '');
  const [course, setCourse] = useState<Course>(existingItem?.course ?? 'Main Course');

  const handleUpdate = () => {
    if (!name.trim() || !price.trim() || !id) {
      Alert.alert('Error', 'Name and Price are required.');
      return;
    }

    updateMenuItem(id, {
      name,
      description,
      course,
      price: Number(price),
    });
    router.back();
  };

  if (!existingItem) {
    return <Text style={{ margin: 20 }}>Item not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Price (R) *</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseContainer}>
        {(['Starter', 'Main Course', 'Dessert'] as Course[]).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.courseBtn, course === option && styles.courseBtnActive]}
            onPress={() => setCourse(option)}
          >
            <Text style={[styles.courseText, course === option && styles.courseTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={styles.saveBtnText}>Update Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F0F0F3', padding: 12, borderRadius: 8, fontSize: 16 },
  courseContainer: { flexDirection: 'row', gap: 10, marginTop: 8 },
  courseBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#E0E1E6', alignItems: 'center' },
  courseBtnActive: { backgroundColor: '#0274DF' },
  courseText: { color: '#000' },
  courseTextActive: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#0274DF', padding: 16, borderRadius: 8, marginTop: 48, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});