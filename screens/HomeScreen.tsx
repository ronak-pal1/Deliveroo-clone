import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

// sanity deployed studio link : https://deliverooronak.sanity.studio/vision

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=='featured']{
      ...,
      resturants[] -> {
        ...,
        dishes[] -> {
          ...,
        }

      }
  }
    `,
      )
      .then(data => {
        setFeaturedCategories(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch(
  //     createSanityApiURL(`
  //     *[_type=='featured']{
  //           ...,
  //         resturants[] -> {
  //           ...,
  //           dishes[] -> {
  //             ...,
  //           }
  //         }
  //       }
  //      `),
  //   )
  //     .then(res => res.json())
  //     .then(({result}) => {
  //       setFeaturedCategories(result);
  //       console.log(featuredCategories);
  //     });
  // }, []);

  return (
    <SafeAreaView className="pt-5 bg-white">
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://blob.sololearn.com/avatars/fd84fff3-8135-4734-8d94-ec8361704898.jpg',
          }}
          className="w-9 h-9 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now !</Text>
          <Text className="font-bold text-xl text-black">
            <Text>Current Location</Text>
            <ChevronDownIcon size={20} color="#00BBCC" />
          </Text>
        </View>
        <UserIcon size={35} color="#00BBCC" />
      </View>

      {/* Search */}
      <View className="flex-row items-center pb-2 mx-4 space-x-2">
        <View className="flex-row space-x-2 p-2 items-center flex-1 bg-gray-200">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Resturants and cuisins"
            keyboardType="default"
          />
        </View>

        <AdjustmentsVerticalIcon size={25} color="#00BBCC" />
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        {/* Categories */}
        <Categories />

        {/* Features rows */}

        {featuredCategories?.map(categories => (
          <FeaturedRow
            key={categories._id}
            id={categories._id}
            title={categories.name}
            description={categories.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
