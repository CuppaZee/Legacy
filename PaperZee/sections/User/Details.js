import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#c6e3b6', flexDirection: "column" }}>
      <View style={{ flex: 1, maxHeight: 88, flexDirection: "row" }}>
        <View style={{ padding: 8 }}>
          <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(15078).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
        </View>
        <View style={{ padding: 8, paddingLeft: 0, flexGrow: 1, flexShrink: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 24 }} numberOfLines={1} ellipsizeMode={"tail"}>LympstoneBigtrotters</Text>
          {/* <Text style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
          <Text style={{ fontSize: 16, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> Level 121</Text>
          <Text style={{ fontSize: 16, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #1463</Text>
        </View>
        <View style={{ padding: 8 }}>
          <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/tk.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
        </View>
      </View>
    </View>
  );
}