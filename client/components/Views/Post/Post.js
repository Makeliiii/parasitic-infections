import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import PostItem from './components/PostItem'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items
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
            <View style={{ justifyContent: "center", alignItems: "center" }} >
                { this.posts() }
            </View>
        )
    }
}

export default Post