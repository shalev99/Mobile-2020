import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import FlatListItem from './components/FlatListItem'
//new
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isloading: 1,
      select_list_grid: 0,
      searchText: '',
      amount: 9,
      apiUrl: 'https://pixabay.com/api',
      apiKey: '16057008-0c7279d0bc1196f45d9c9eea1',
      flatListData: [],
      for_hide_test_res_in_the_first_time: 0,
      is_fav: 0,
      fav_images: []
    }
  }

  onTextChange = (text) => {
    this.setState({ isloading: 0 })
    this.setState({ for_hide_test_res_in_the_first_time: 1 })
    const val = text
    this.setState({ [text]: val }, () => {
      if (val === '') {
        this.setState({ flatListData: [] })
        this.setState({ isloading: 1 })
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${text}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => this.setState({ flatListData: res.data.hits, isloading: 1 }))
          .catch((err) => console.log(err))
      }
    })
  }

  grid_View = () => {
    this.setState({ select_list_grid: 1 })
  }

  list_View = () => {
    this.setState({ select_list_grid: 0 })
  }
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item.largeImageURL }}
          style={{ width: 100, height: 100, margin: 5 }}
        >
        </Image>
      </View>
    )
  }
  render() {
    const clicl_on_fav = () => {
      if (is_fav === 1) {
        this.state.is_fav = 0
        this.setState({ is_fav: 0 })
      } else {
        this.state.is_fav = 1
        this.setState({ is_fav: 1 })
      }
    }
    const {
      isloading,
      select_list_grid,
      flatListData,
      for_hide_test_res_in_the_first_time,
      is_fav
    } = this.state
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <View style={styles.header}>
          <Text style={styles.header}>Image Browser </Text>
          <TouchableOpacity onPress={() => clicl_on_fav()}>
            <Image
              source={{
                uri:
                  '  https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/favourite512x512.png            '
              }}
              style={{ width: 25, height: 25, margin: 5, marginLeft: '45%' }}
            >
            </Image>
          </TouchableOpacity>
        </View>

        {is_fav === 0 ? (
          <View backgroundColor={'#808080'}>
            <TextInput
              placeholder={'Search'}
              onChangeText={(text) => {
                this.onTextChange(text)
              }}
              style={styles.search}
            />

            <View style={styles.Button_up}>
              <Button title={'Grid View'} onPress={this.grid_View} />
            </View>
            <View style={styles.Button_up}>
              <Button title={'List View'} onPress={this.list_View} />
            </View>
          </View>
        ) : (
          <Text></Text>
        )}

        {is_fav !== 0 ? (
          <FlatList
            data={this.state.fav_images}
            style={styles.container_grid}
            renderItem={this.renderItem}
            numColumns={3}
          />
        ) : (
          <Text></Text>
        )}

        {!select_list_grid ? (
          <View style={{ flex: 1, marginTop: 22 }}>
            <FlatList
              data={flatListData}
              renderItem={({ item, index }) => {
                return (
                  <FlatListItem
                    imgArr={this.state.fav_images}
                    item={item}
                    index={index}
                  >
                  </FlatListItem>
                )
              }}
            >
            </FlatList>
          </View>
        ) : (
          <FlatList
            data={flatListData}
            style={styles.container_grid}
            renderItem={this.renderItem}
            numColumns={3}
          />
        )}

        {flatListData.length === 0 && for_hide_test_res_in_the_first_time !== 0 ? (
          <View style={styles.Indicator}>
            <Text style={{ fontSize: 30, marginTop: -200 }}>No Results Were Found</Text>
          </View>
        ) : (
          <Text></Text>
        )}

        {!isloading ? (
          <View style={styles.Indicator}>
            <ActivityIndicator style={styles.Indicator} color={'#00FFFF'} size={'large'} />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container_grid: {
    flex: 1,
    marginVertical: 20
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 200
  },
  itemInvisible: {
    backgroundColor: 'transparent'
  },
  itemText: {
    color: '#fff'
  },
  flatListItem: {
    color: 'black',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 'auto'
  },
  safeArea: {
    backgroundColor: '#00FFFF',
    height: 28
  },
  Button_up: {
    borderWidth: 3,
    borderColor: '#4682B4',
    borderRadius: 10
  },
  header: {
    backgroundColor: '#FFB6C1',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#CD5C5C',
    fontWeight: 'bold',
    fontSize: 20
  },
  Indicator: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -220
  },
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    height: 60,
    fontSize: 28,
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FFFFFF'
  }
})
