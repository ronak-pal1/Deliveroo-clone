import {Image, Text, TouchableOpacity, View} from 'react-native';
import {urlFor} from '../sanity';
import {useState} from 'react';
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithID,
} from '../features/basketSlice';

const DishRow = ({
  id,
  title,
  price,
  description,
  imgUrl,
}: {
  id: String;
  title: String;
  price: Number;
  description: String;
  imgUrl: any;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithID(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({id, title, price, description, imgUrl}));
  };

  const removeItemToBasket = () => {
    if (!(items.length > 0)) return;

    dispatch(removeFromBasket({id}));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200  ${
          isPressed && 'border-b-0'
        }`}>
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1 text-black">{title}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">₹{price}</Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              source={{uri: urlFor(imgUrl).url()}}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={items.length <= 0}
              onPress={removeItemToBasket}>
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? '#00CCBB' : 'gray'}
              />
            </TouchableOpacity>

            <Text className="text-black">{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
