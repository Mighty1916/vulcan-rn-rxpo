// Tab layout for main app navigation. Redirects unauthenticated users to sign-in.
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { TouchableOpacity, Platform } from "react-native";

const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        // Custom tab bar button for better touch feedback
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.8} />
        ),
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        // Custom tab bar style for rounded, elevated look
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 16,
          right: 16,
          height: 65,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: Platform.OS === 'android' ? 10 : 20,
          elevation: 50,
          borderTopWidth: 2,
          borderColor: '#f3f3f3',
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />, // Home icon
        }}
      />
      <Tabs.Screen
        name="kits"
        options={{
          title: "Kits",
          tabBarIcon: ({ color, size }) => <Ionicons name="shirt" size={size} color={color} />, // Kits icon
        }}
      />
      <Tabs.Screen
        name="join"
        options={{
          title: "join-us",
          tabBarIcon: ({ color, size }) => <Ionicons name="football" size={size} color={color} />, // Join icon
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: "news",
          tabBarIcon: ({ color, size }) => <Ionicons name="megaphone" size={size} color={color} />, // News icon
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;