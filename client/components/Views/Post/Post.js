import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'

import PostItem from './components/PostItem'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            value: ''
        }
    }

    posts = () => {
        const { items } = this.props

        return items.map((item, index) => {
            return (
                <PostItem
                    key={index}
                    imgURI={ `https://agony.s-ul.eu/6RLsganS` }
                    title={ item.title }
                    description={ item.description }
                    country={ item.location.country }
                    city={ item.location.city }
                    price={ item.price.$numberDecimal }
                />
            )
        })
    }

    render() {
        return (
            <View style={styles.screen} >
                <Text style={styles.text}>Posts</Text>
                <Text>Get items by</Text>
                <Picker
                    style={{ alignSelf: 'center', width: '50%' }}
                    selectedValue={this.state.value}
                    onValueChange={itemValue => this.setState({ value: itemValue })}
                >
                    <Picker.Item label='All' value='all' />
                    <Picker.Item label='Category' value='category' />
                    <Picker.Item label='Location' value='location' />
                </Picker>

                    <View style={styles.posts}>
                        { this.posts() }
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        marginBottom: 25,
        fontSize: 26,
    },
    posts: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Post