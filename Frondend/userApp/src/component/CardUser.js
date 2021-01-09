import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CardUser = (props, id) => {
    return (
        <View style={styles.container} id={props.key} >
            <View style={styles.card} >
                <Text>name : {props.name}</Text>
                <Text>email : {props.email}</Text>
                <Text>phone : {props.phone}</Text>
                <Text>address : {props.address}</Text>
            </View>
        </View>
    )
}

export default CardUser

const styles = StyleSheet.create({

    container: {
        marginTop: 8,
        paddingHorizontal: 20,


    },
    card: {
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5

    }

})
