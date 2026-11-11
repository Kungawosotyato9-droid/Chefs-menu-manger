import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useMenu } from '@/context/MenuContext';

export default function MenuDashboardScreen() {
  const router = useRouter();
  const { menuItems, deleteMenuItem } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Dashboard</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add')}>
        <Text style={styles.addButtonText}>Add menu item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteMenuItem(item.id)}
              hitSlop={10}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#0274DF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  course: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0274DF',
  },
  deleteButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#d72626',
    fontWeight: '600',
  },
});
