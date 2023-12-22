import {ScrollView, Text, View} from 'react-native';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import ResturantCard from './ResturantCard';
import sanityClient from '../sanity';
import {useEffect, useState} from 'react';

const FeaturedRow = ({
  id,
  title,
  description,
}: {
  id: Number;
  title: String;
  description: String;
}) => {
  // const foodImage =
  //   'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FRecipes%2F2019-08-how-to-juiciest-turkey-meatballs%2FHow-to-Make-the-Best-Juiciest-Turkey-Meatballs_055';

  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      
      *[_type=='featured' && _id == $id]{
        ...,
        resturants[] -> {
          ...,
          dishes[] ->,
          type -> {
            name
          }
  
        }
    }[0]`,
        {id},
      )
      .then(data => {
        setResturants(data?.resturants);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-2xl text-black">{title}</Text>
        <ArrowRightIcon color="#00BBCC" />
      </View>

      <Text className="text-gray-500 px-4 text-xs">{description}</Text>

      <ScrollView
        className="pt-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {resturants?.map(resturant => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.name}
            address={resturant.address}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
