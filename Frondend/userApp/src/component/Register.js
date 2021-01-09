import React, { Component } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
const qs = require('query-string');

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            address: ''
        }
    }

    handleName = (text) => {
        this.setState({ name: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePhone = (text) => {
        this.setState({ phone: text })
    }
    handleAddress = (text) => {
        this.setState({ address: text })
    }



    klikPost() {
        if (this.state.name && this.state.email && this.state.phone && this.state.address) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address
            }
            var config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                responseType: 'blob'
            };
            var url = 'http://10.107.96.149:3000/user'
            axios.post(url, qs.stringify(user), config)
                .then((res) => {
                    Alert.alert("Data Berhasil Ditambahkan");
                    this.props.navigation.jumpTo('Home')
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
            console.log(this.state);
        }
        else {
            Alert.alert('Error, Harap diisi dengan lengkap')
        }
    }






    render() {
        return (
            <View style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Register User</Text>
                </View>
                <View style={styles.content}>
                    <Text>Name : </Text>
                    <TextInput style={styles.input} placeholder="Masukan Name " onChangeText={this.handleName} />
                </View>
                <View style={styles.content}>
                    <Text>Email : </Text>
                    <TextInput style={styles.input} placeholder="Masukan Email " onChangeText={this.handleEmail} />
                </View>
                <View style={styles.content}>
                    <Text>Phone : </Text>
                    <TextInput style={styles.input} placeholder="Masukan Phone " onChangeText={this.handlePhone} />
                </View>
                <View style={styles.content}>
                    <Text>Address : </Text>
                    <TextInput style={styles.input} placeholder="Masukan Address " onChangeText={this.handleAddress} />
                </View>
                <View style={{
                    alignItems: 'flex-end',
                    paddingHorizontal: 20
                }}>
                    <TouchableOpacity style={styles.button} onPress={this.klikPost.bind(this)}>
                        <Text style={styles.btnSearch}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 5,
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
        padding: 10,


    }
})
