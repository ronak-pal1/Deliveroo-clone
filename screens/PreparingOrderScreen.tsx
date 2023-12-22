import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

const PreparingOrderScreen = () => {
  const navigator = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigator.navigate('DeliveryScreen');
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] justify-center items-center">
      <Animatable.Image
        source={require('../assets/delivery-team.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg text-white font-bold text-center my-10">
        Waiting for the Resturant to accept your order!
      </Animatable.Text>

      <Progress.Circle
        size={60}
        indeterminate={true}
        fill="transparent"
        color="white"
        borderWidth={20}
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
