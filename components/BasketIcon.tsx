import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBasketItems, selectBasketTotal} from '../features/basketSlice';

const BasketIcon = () => {
  const navigator = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-6 w-full z-50">
      <TouchableOpacity
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
        onPress={() => navigator.navigate('Basket')}>
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-sm">
          {items.length}
        </Text>
        <Text className="text-white text-center flex-1 text-lg font-extrabold">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          ₹{basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
