import {Image, Text, TouchableOpacity, View} from 'react-native';

const CategoryCard = ({imgUrl, title}: {imgUrl: String; title: String}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{uri: imgUrl}} className="h-20 w-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
