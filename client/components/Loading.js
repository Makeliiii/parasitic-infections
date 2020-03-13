import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const Loading = () => {
    return (
        <ActivityIndicator style={styles.container} size="large" color="#0000ff" />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
      },
})

export default Loading