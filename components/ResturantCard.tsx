import {Image, Text, TouchableOpacity, View} from 'react-native';
import {MapPinIcon} from 'react-native-heroicons/outline';
import {StarIcon} from 'react-native-heroicons/solid';
import {urlFor} from '../sanity';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {cleanBasket} from '../features/basketSlice';

const ResturantCard = ({
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
}: {
  id: Number;
  imgUrl: String;
  title: String;
  rating: Number;
  genre: String;
  address: String;
  short_description: String;
  dishes: String[];
  long: Number;
  lat: Number;
}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const goToRestro = () => {
    navigator.navigate('Resturant', {
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
    });

    dispatch(cleanBasket());
  };

  return (
    <TouchableOpacity className="bg-white mr-3 shadow" onPress={goToRestro}>
      <Image
        source={{uri: urlFor(imgUrl).url()}}
        className="w-64 h-36 rounded"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2 text-black">{title}</Text>

        <View className="flex-row items-center space-x-1">
          <StarIcon size={22} color="green" opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResturantCard;
