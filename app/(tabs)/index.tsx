import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, View } from '@/components/Themed';
import { useCreditsStore } from '@/components/useCreditsStore';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ 
  ? TestIds.REWARDED 
  : 'ca-app-pub-2875410688436106/7203720130';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

export default function TabOneScreen() {
  const addCredits = useCreditsStore((state: any) => state.addCredits);
  const credits = useCreditsStore((state: any) => state.credits);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED, 
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        addCredits(10); // Add 10 credits when ad is completed
      }
    );

    // Start loading the rewarded ad
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const handleShowAd = () => {
    if (loaded) {
      rewarded.show();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Credits: {credits}</Text>
      <Button 
        mode="contained" 
        onPress={handleShowAd} 
        style={styles.button}
        disabled={!loaded}
      >
        {loaded ? 'Watch Rewarded Ad' : 'Ad Loading...'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 20,
  },
});
