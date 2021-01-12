import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Alert, Text } from "react-native";
import { fetchOrders } from "../api";
import Header from "../Header";
import { Order } from "../types";
import OrderCard from './../OrderCard/index';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function Orders() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchOrders()
    .then(response => setOrders(response.data))
    .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
    .finally(() => setIsLoading(false));

  }, []);
  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <Text style={styles.text}>Buscando pedidos...</Text>
        ) : (
          orders.map(order =>(
            <TouchableWithoutFeedback key={order.id}>
              <OrderCard order={order} />          
            </TouchableWithoutFeedback>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },

  text: {
    fontWeight: 'normal',
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_400Regular'
  },
});

export default Orders;
