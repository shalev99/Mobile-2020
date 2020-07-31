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

class FlatListItem extends Component {
  constructor() {
    super()
    this.state = {
      hide_top_resent_pic: 1
    }
  }

  render() {
    const add_to_fav = (largeImageURL) => {
      if (this.props.imgArr.length === 0) {
        this.props.imgArr.push({ largeImageURL })
      }
      let flag = 0

      for (let i = 0; i < this.props.imgArr.length; ++i) {
        if (this.props.imgArr[i].largeImageURL === largeImageURL) {
          flag = 1
        }
      }

      if (flag === 0) {
        this.props.imgArr.push({ largeImageURL })
      }
    }

    const return_page = () => {
      this.state.hide_top_resent_pic = 0
      this.setState({ hide_top_resent_pic: 0 })
    }

    const PRESSIMAGE = (largeImageURL) => {
      this.state.hide_top_resent_pic = 0
      this.setState({ hide_top_resent_pic: 0 })
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        {!this.state.hide_top_resent_pic ? (
          <View>
            <TouchableOpacity onPress={() => return_page()}>
              <Image
                source={{
                  uri: 'https://icon-library.net/images/return-icon-png/return-icon-png-3.jpg'
                }}
                style={{ width: 50, height: 50, margin: 5, marginLeft: '40%' }}
              >
              </Image>
            </TouchableOpacity>

            <Image
              source={{ uri: this.props.item.largeImageURL }}
              style={{ width: 400, height: 400, margin: 5 }}
            >
            </Image>

            <TouchableOpacity onPress={() => add_to_fav(this.props.item.largeImageURL)}>
              <Image
                source={{
                  uri:
                    '  https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/favourite512x512.png            '
                }}
                style={{ width: 50, height: 50, margin: 5, marginLeft: '40%' }}
              >
              </Image>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white'
            }}
          >
            <TouchableOpacity onPress={() => PRESSIMAGE(this.props.item.largeImageURL)}>
              <Image source={{ uri: this.props.item.largeImageURL }} style={styles.Image1}></Image>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                height: 100
              }}
            >
              <Text style={styles.flatListItem}>{this.props.item.user}</Text>
              <Text style={styles.flatListItem}>
                Views: {this.props.item.views} likes: {this.props.item.likes}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.view1}></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'black',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 'auto'
  },
  view1: {
    height: 1,
    backgroundColor: 'white'
  },
  view2: {
    height: 1,
    backgroundColor: 'white'
  },
  Image1: {
    width: 100,
    height: 100,
    margin: 5
  }
})
export default FlatListItem
