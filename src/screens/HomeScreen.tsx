import {View, Text, ScrollView, Image, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import {useEffect, useState} from "react";
import axios from "axios";
import Recipes from "../components/Recipes";
import {CategoryType, MealType} from "../types";


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [recipes, setRecipes] = useState<MealType[]>([])

  function handleCategoryOnSelect(category: CategoryType) {
    setSelectedCategory(category);
  }

  async function getCategories() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if(response && response.data) {
        setCategories(response.data.categories)
      }

    } catch (e) {
      console.error('getCategoriesError', e)
    }
  }

  async function getRecipesByCategory(selectedCategoryName: string) {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategoryName}`)
      if(response && response.data) {
        setRecipes(response.data.meals)
      }

    } catch (e) {
      console.error('getRecipesByCategoryError', e)
    }
  }

  useEffect(() => {
    getCategories().then(() => getRecipesByCategory("Beef").then());
  }, []);

  useEffect(() => {
    if(!selectedCategory) return;
    getRecipesByCategory(selectedCategory?.strCategory ?? "Beef").then();
  }, [selectedCategory]);

  return (
    <View className={'flex-1 bg-white'}>
      <StatusBar style={'dark'}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14">

        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/avatar.jpg')} className={'rounded-full'} style={{height: hp(5), width: hp(5)}}/>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.7)}} className={'text-neutral-600'}>Hello, Developer!</Text>
          <View className={'font-semibold text-neutral-600'}>
            <Text style={{fontSize: hp(3.8)}} className={'font-semibold text-neutral-600'}>Make your own food,</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className={'font-semibold text-neutral-600'}>
            stay at <Text className={'text-amber-500'}>home</Text>
          </Text>
        </View>

        <View className={'mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'}>
          <TextInput
            placeholder={'Search any recipe'}
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className={'flex-1 text-base mb-1 pl-3 tracking-wider'}
          />
          <View className={'bg-white rounded-full p-3'}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}/>
          </View>
        </View>

        {
          categories.length > 0 && (
            <View>
              <Categories categories={categories} category={selectedCategory} onCategorySelect={handleCategoryOnSelect}/>
            </View>
          )
        }

        <View>
          <Recipes meals={recipes}/>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;