import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { Course } from '@/types/menu';
import { useMenu } from '@/context/MenuContext';

export default function AddItemScreen() {
  const router = useRouter();
  const { addMenuItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<Course>('Main Course');

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Error', 'Name and Price are required.');
      return;
    }

    addMenuItem({
      name,
      description,
      course,
      price: Number(price),
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Beef Burger"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="e.g. Served with fries"
      />

      <Text style={styles.label}>Price (R) *</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="e.g. 120"
      />

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

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Item</Text>
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