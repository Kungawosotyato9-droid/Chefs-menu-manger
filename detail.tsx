import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useMenu } from '@/context/MenuContext';

export default function ItemDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { menuItems } = useMenu();

  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>No item selected</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.mockupWindow}>
          <Text style={styles.windowHeaderTitle}>Item details</Text>

          <View style={styles.detailsBodyBox}>
            <Text style={styles.detailsDishTitle}>{item.name}</Text>
            <Text style={styles.detailsCategorySubText}>{item.course}</Text>
            <Text style={styles.detailsDescriptionText}>{item.description}</Text>

            <View style={styles.detailsPriceDividerLine} />

            <View style={styles.detailsPriceRow}>
              <Text style={styles.detailsPriceLabel}>Price</Text>
              <Text style={styles.detailsPriceValue}>R{item.price.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.whiteOutlineButton} onPress={() => router.push({ pathname: '/edit', params: { id: item.id } })}>
            <Text style={styles.whiteOutlineButtonText}>Edit item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textSecondaryCancelLink} onPress={() => router.replace('/')}>
            <Text style={styles.cancelLinkText}>Back to Menu</Text>
          </TouchableOpacity>
          <Text style={styles.frameLabelText}>Item details</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  mockupWindow: { backgroundColor: '#ffffff', width: '100%', maxWidth: 380, borderRadius: 24, borderWidth: 1, borderColor: '#e8e8e8', padding: 24, alignItems: 'stretch', elevation: 3 },
  windowHeaderTitle: { fontSize: 18, fontWeight: '600', color: '#000000', textAlign: 'center', marginBottom: 24 },
  detailsBodyBox: { paddingHorizontal: 4, paddingVertical: 8, marginBottom: 8 },
  detailsDishTitle: { fontSize: 20, fontWeight: '700', color: '#000000', marginBottom: 2 },
  detailsCategorySubText: { fontSize: 13, color: '#888888', marginBottom: 8 },
  detailsDescriptionText: { fontSize: 14, color: '#555', marginBottom: 16 },
  detailsPriceDividerLine: { height: 1, backgroundColor: '#eeeeee', marginBottom: 16 },
  detailsPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailsPriceLabel: { fontSize: 14, color: '#666666' },
  detailsPriceValue: { fontSize: 16, fontWeight: '700', color: '#000000' },
  whiteOutlineButton: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc', borderRadius: 10, paddingVertical: 10, alignItems: 'center', height: 40 },
  whiteOutlineButtonText: { color: '#000000', fontSize: 14, fontWeight: '500' },
  textSecondaryCancelLink: { alignSelf: 'center', marginTop: 16 },
  cancelLinkText: { color: '#888888', fontSize: 13, textDecorationLine: 'underline' },
  frameLabelText: { fontSize: 11, color: '#aaaaaa', textAlign: 'center', marginTop: 24 },
});
