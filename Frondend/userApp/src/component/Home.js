import axios from 'axios';
import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardUser from './CardUser'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        var url = 'http://10.107.96.149:3000/user/list'
        axios.get(url).then((ambilData) => {

            this.setState({
                data: ambilData.data
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <ScrollView>
                <View style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Welcome UserApp</Text>
                    </View>

                    <View style={styles.content}>
                        <Text>Search by :</Text>
                        <TextInput style={styles.input} placeholder="name/email/phone/address" />
                    </View>
                    <View style={styles.content2}>
                        <Text>Keyword :</Text>
                        <TextInput style={styles.input} placeholder="Masukan Keyword" />
                    </View>
                    <View style={{
                        alignItems: 'flex-end',
                        paddingHorizontal: 20
                    }}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.btnSearch}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {this.state.data.map((user) => {
                            return (
                                <CardUser
                                    id={user.id}
                                    name={user.name}
                                    email={user.email}
                                    phone={user.phone}
                                    address={user.address}
                                />
                            )

                        })}
                    </View>





                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },

    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'skyblue',
    },
    headerTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    content: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    content2: {
        paddingHorizontal: 20,
        paddingBottom: 20,

    },
    input: {
        marginTop: 5,
        padding: 5,
        height: 40,
        borderWidth: 1,
        borderRadius: 5
    },

    button: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    btnSearch: {
        width: '40%',
        padding: 10

    }


})
