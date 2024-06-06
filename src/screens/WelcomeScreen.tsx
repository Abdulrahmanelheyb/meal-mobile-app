import {View, Text, Image} from "react-native";
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from "react-native-reanimated";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";


const WelcomeScreen = () => {
  const navigation = useNavigation();
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);



  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100);
    setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300);
    setTimeout(() => navigation.navigate('Home'), 2500)
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-sky-200">
      <StatusBar style={'dark'}/>
      <Animated.View className={'bg-sky-300 rounded-full'} style={{padding: ring2Padding}}>
        <Animated.View className={'bg-sky-400 rounded-full'} style={{padding: ring1Padding}}>
          <Image source={require('../../assets/images/meal.png')} style={{width: 200, height: 200}}/>
        </Animated.View>
      </Animated.View>

      <View className={'flex items-center'}>
        <Text style={{fontSize: hp(7)}} className={'font-bold tracking-widest'}>
          MealApp
        </Text>
        <Text style={{fontSize: hp(2)}} className={'font-medium pt-3'}>
          Great when you hungry :D
        </Text>
      </View>
    </View>
  );
}

export default WelcomeScreen;