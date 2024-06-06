import {Image, ScrollView, TouchableOpacity, View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import navigation, {NavigationProps} from "../navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ChevronLeftIcon, ClockIcon} from "react-native-heroicons/outline";
import {FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon} from "react-native-heroicons/solid";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated from "react-native-reanimated";

const RecipeDetailScreen = (props: NavigationProps<'RecipeDetailScreen'>) => {
  const navigation = useNavigation();
  const recipe = props.route.params;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [meal, setMeal] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRecipe().then();
  }, []);

  async function getRecipe() {
    if (!recipe) return;

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      if (response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false);
      }

    } catch (e) {
      console.error('getRecipeError', e)
    }
  }

  function isNonEmptyString(value: any): boolean {
    return typeof value==='string' && value.trim()!=='';
  }

  function getAvailableIngredients(obj: any): string[] {
    return Array.from({length: 20}, (_, i) => `strIngredient${i + 1}`).filter((key) => {
      return obj.hasOwnProperty(key) && isNonEmptyString(obj[key])
    }).map((x) => x.replace('strIngredient', ''));
  }

  function getYouTubeVideoID(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  return (
    <ScrollView
      className={'bg-white flex-1'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={'light'}/>
      <View>
        <Animated.Image
          sharedTransitionTag={recipe?.strMeal}
          source={{uri: recipe?.strMealThumb}}
          style={{
            width: wp(100),
            height: hp(50),
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50
          }}
        />
      </View>

      <View className={'w-full absolute flex-row justify-between items-center pt-10'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'p-2 rounded-full ml-5 bg-white'}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4} color={'#fbbf24'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className={'p-2 rounded-full mr-5 bg-white'}>
          <HeartIcon size={hp(3.5)} color={isFavorite ? 'red':'gray'}/>
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <Loading/>
        ):(
          <View className={'px-4 flex justify-between space-y-4 pt-8'}>
            <View className={'space-y-2'}>
              <Text style={{fontSize: hp(3)}} className={'font-bold flex-1 text-neutral-700'}>
                {meal?.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className={'font-medium flex-1 text-neutral-500'}>
                {meal?.strArea}
              </Text>
            </View>

            <View className={'flex-row justify-around'}>
              <View className={'flex rounded-full bg-amber-300 p-2'}>
                <View
                  style={{width: hp(6.5), height: hp(6.5)}}
                  className={'bg-white rounded-full flex items-center justify-center'}
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className={'flex items-center py-2 space-y-1'}>
                  <Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-700'}>
                    35
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-700'}>
                    Mins
                  </Text>
                </View>
              </View>
              <View className={'flex rounded-full bg-amber-300 p-2'}>
                <View
                  style={{width: hp(6.5), height: hp(6.5)}}
                  className={'bg-white rounded-full flex items-center justify-center'}
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className={'flex items-center py-2 space-y-1'}>
                  <Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-700'}>
                    03
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-700'}>
                    Servings
                  </Text>
                </View>
              </View>
              <View className={'flex rounded-full bg-amber-300 p-2'}>
                <View
                  style={{width: hp(6.5), height: hp(6.5)}}
                  className={'bg-white rounded-full flex items-center justify-center'}
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className={'flex items-center py-2 space-y-1'}>
                  <Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-700'}>
                    204
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-700'}>
                    Cal
                  </Text>
                </View>
              </View>
              <View className={'flex rounded-full bg-amber-300 p-2'}>
                <View
                  style={{width: hp(6.5), height: hp(6.5)}}
                  className={'bg-white rounded-full flex items-center justify-center'}
                >
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className={'flex-1 justify-center items-center py-2 space-y-1'}>
                  <Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-700'}>
                    Easy
                  </Text>
                </View>
              </View>
            </View>

            <View className={'space-y-4'}>
              <Text style={{fontSize: hp(2.5)}} className={'font-bold flex-1 text-neutral-700'}>
                Ingredients
              </Text>
              <View className={'space-y-2 ml-3'}>
                {
                  getAvailableIngredients(meal).map((key, index) => (
                    <View key={index} className={'flex-row space-x-4'}>
                      <View
                        style={{width: hp(1.5), height: hp(1.5)}}
                        className={'bg-amber-300 rounded-full'}
                      />
                      <View className={'flex-row space-x-2'}>
                        <Text style={{fontSize: hp(1.7)}} className={'font-extrabold text-neutral-700'}>{meal[`strMeasure${key}`]}</Text>
                        <Text style={{fontSize: hp(1.7)}} className={'font-medium text-neutral-600'}>{meal[`strIngredient${key}`]}</Text>
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>

            <View className={'space-y-4'}>
              <Text style={{fontSize: hp(2.5)}} className={'font-bold flex-1 text-neutral-700'}>
                Instructions
              </Text>
              <Text style={{fontSize: hp(1.6)}} className={'text-neutral-700'}>
                {meal?.strInstructions}
              </Text>
            </View>

            {
              meal?.strYoutube && (
                <View className={'space-y-4'}>
                  <Text style={{fontSize: hp(2.5)}} className={'font-bold flex-1 text-neutral-700'}>
                    Recipe Video
                  </Text>
                  <View>
                    <YoutubeIframe videoId={getYouTubeVideoID(meal?.strYoutube) || ''} height={hp(30)}/>
                  </View>
                </View>
              )
            }
          </View>
        )
      }
    </ScrollView>
  );
}

export default RecipeDetailScreen;