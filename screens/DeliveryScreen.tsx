import {useNavigation} from '@react-navigation/native';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectResturant} from '../features/resturantSlice';
import {XMarkIcon} from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';

const DeliveryScreen = () => {
  const navigator = useNavigation();
  const resturant = useSelector(selectResturant);

  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigator.navigate('Home')}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-ligt text-lg text-white">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 p-5 rounded-md z-50 shadow-md">
          <View className="flex-row justify-between">
            <View className="">
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold text-black">
                45-55 Minutes
              </Text>
            </View>

            <Image
              source={{
                uri: 'https://blob.sololearn.com/avatars/fd84fff3-8135-4734-8d94-ec8361704898.jpg',
              }}
              className="w-20 h-20 bg-gray-300 rounded-full"
            />
          </View>

          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Your order at {resturant.title} is being prepared
          </Text>
        </View>

        {/*Google map will be placed here*/}

        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
          <Image
            source={{
              uri: 'https://blob.sololearn.com/avatars/fd84fff3-8135-4734-8d94-ec8361704898.jpg',
            }}
            className="w-12 h-12 bg-gray-300 rounded-full p-4 ml-5"
          />
          <View className="flex-1">
            <Text className="text-lg text-black">Ashneer Grover</Text>
            <Text className="text-gray-400">Your Rider</Text>
          </View>

          <Text className="mr-5 text-lg font-bold text-[#00CCBB]">Call</Text>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
