import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { MenuProvider } from '@/context/MenuContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <MenuProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Chef Dashboard' }} />
          <Stack.Screen name="detail" options={{ title: 'Menu Item Details' }} />
          <Stack.Screen name="edit" options={{ title: 'Edit Item' }} />
          <Stack.Screen name="add" options={{ title: 'Add New Item' }} />
        </Stack>
      </ThemeProvider>
    </MenuProvider>
  );
}