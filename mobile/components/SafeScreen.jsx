import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

// SafeScreen: Ensures content is rendered within the device's safe area and applies background color.
const SafeScreen = React.memo(({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </View>
  );
});
SafeScreen.displayName = "SafeScreen";
export default SafeScreen;