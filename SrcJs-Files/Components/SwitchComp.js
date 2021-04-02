import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import mycolor from "../Constants/Colors";

const SwitchComp = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: mycolor.lightgray, true: mycolor.lightPink }}
        thumbColor={isEnabled ? mycolor.pink : mycolor.darkgray}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: "baseline",
    justifyContent: "flex-end"
  }
});

export default SwitchComp;