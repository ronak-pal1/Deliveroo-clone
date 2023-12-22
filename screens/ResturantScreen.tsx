import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {urlFor} from '../sanity';
import {useEffect, useLayoutEffect} from 'react';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import {QuestionMarkCircleIcon} from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import {useDispatch, useSelector} from 'react-redux';
import {selectBasketItems} from '../features/basketSlice';
import {setResturant} from '../features/resturantSlice';

const ResturantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const items = useSelector(selectBasketItems);

  useEffect(() => {
    dispatch(
      setResturant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      {items.length > 0 && <BasketIcon />}
      <ScrollView>
        <View className="relative">
          <Image
            source={{uri: urlFor(imgUrl).url()}}
            className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity
            className="absolute top-8 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-black text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500">
                  Nearby . {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 pb-4 mt-2 ">
              {short_description}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={25} />
            <Text className="flex-1 font-bold pl-2 text-md text-black">
              Have a food allergy ?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 font-bold text-xl mb-3 text-black">
            Menu
          </Text>

          {/* DishRow */}

          {dishes?.map(dish => (
            <DishRow
              key={dish._id}
              id={dish._id}
              title={dish.name}
              price={dish.price}
              description={dish.short_description}
              imgUrl={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ResturantScreen;
