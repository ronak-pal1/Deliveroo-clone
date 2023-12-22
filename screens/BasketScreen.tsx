import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectResturant} from '../features/resturantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import {useMemo, useState} from 'react';
import {XCircleIcon} from 'react-native-heroicons/solid';
import {urlFor} from '../sanity';

const BasketScreen = () => {
  const navigator = useNavigation();
  const resturant = useSelector(selectResturant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItem = items.reduce((results: any, item: any) => {
      (results[item.id] = results[item.id] || []).push(item);

      return results;
    }, {});

    setGroupedItemsInBasket(groupedItem);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100 ">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center text-black">
              Basket
            </Text>
            <Text className="text-center text-gray-400">{resturant.title}</Text>
          </View>

          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-3 right-5"
            onPress={() => navigator.goBack()}>
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://blob.sololearn.com/avatars/fd84fff3-8135-4734-8d94-ec8361704898.jpg',
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1 text-black">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 py-2">
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{uri: urlFor(items[0]?.imgUrl).url()}}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1 text-black">{items[0]?.title}</Text>
              <Text className="text-gray-600">₹{items[0]?.price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({id: key}))}>
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">₹{basketTotal}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">₹75</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-black">Order Total</Text>
            <Text className="text-black font-extrabold">
              ₹{75 + basketTotal}
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-4"
            onPress={() => navigator.navigate('PreparingOrderScreen')}>
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
