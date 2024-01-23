import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Fetch orders from local storage on component mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []); // Empty dependency array to run only on mount

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  // Update local storage whenever orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const [newOrder, setNewOrder] = useState({
    kindOfFood: "",
    quantity: "",
    pickupDateTime: "",
    personalInfo: "",
    phoneNumber: "",
    address: "",
  });
  const [updatedOrder, setUpdatedOrder] = useState({
    kindOfFood: "",
    quantity: "",
    pickupDateTime: "",
    personalInfo: "",
    phoneNumber: "",
    address: "",
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Update the form with selected order data when selectedOrderId changes
  useEffect(() => {
    if (selectedOrderId !== null) {
      const selectedOrder = orders.find(
        (order) => order.id === selectedOrderId
      );
      if (selectedOrder) {
        setUpdatedOrder(selectedOrder);
      }
    }
  }, [selectedOrderId, orders]);

  const createOrder = () => {
    if (Object.values(newOrder).some((value) => value.trim() === "")) {
      alert("Please fill out all order information.");
      return;
    }

    const updatedOrders = [...orders, { id: Date.now(), ...newOrder }];
    setOrders(updatedOrders);

    // Update local storage after setting orders
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setNewOrder({
      kindOfFood: "",
      quantity: "",
      pickupDateTime: "",
      personalInfo: "",
      phoneNumber: "",
      address: "",
    });
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const updateOrder = () => {
    if (Object.values(updatedOrder).some((value) => value.trim() === "")) {
      alert("Please fill out all updated order information.");
      return;
    }

    if (selectedOrderId !== null) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrderId ? { ...order, ...updatedOrder } : order
      );
      setOrders(updatedOrders);

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setUpdatedOrder({
        kindOfFood: "",
        quantity: "",
        pickupDateTime: "",
        personalInfo: "",
        phoneNumber: "",
        address: "",
      });
      setSelectedOrderId(null);
    }
  };

  return (
    <div className="app">
      <div className="header"></div>

      <h1>Order Management App</h1>

      <div className="order-section">
        <h2>Create Order</h2>
        <div className="input-group">
          <label>Kind of Food:</label>
          <input
            type="text"
            value={newOrder.kindOfFood}
            onChange={(e) =>
              setNewOrder({ ...newOrder, kindOfFood: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>Quantity:</label>
          <input
            type="text"
            value={newOrder.quantity}
            onChange={(e) =>
              setNewOrder({ ...newOrder, quantity: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>Pickup Date and Time:</label>
          <input
            type="text"
            value={newOrder.pickupDateTime}
            onChange={(e) =>
              setNewOrder({ ...newOrder, pickupDateTime: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>Personal Information:</label>
          <input
            type="text"
            value={newOrder.personalInfo}
            onChange={(e) =>
              setNewOrder({ ...newOrder, personalInfo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={newOrder.phoneNumber}
            onChange={(e) =>
              setNewOrder({ ...newOrder, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <input
            type="text"
            value={newOrder.address}
            onChange={(e) =>
              setNewOrder({ ...newOrder, address: e.target.value })
            }
          />
        </div>
        <button onClick={createOrder}>Create Order</button>
      </div>

      <div className="order-section">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Kind of Food</th>
              <th>Quantity</th>
              <th>Pickup Date and Time</th>
              <th>Personal Information</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.kindOfFood}</td>
                <td>{order.quantity}</td>
                <td>{order.pickupDateTime}</td>
                <td>{order.personalInfo}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                  <button onClick={() => setSelectedOrderId(order.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrderId !== null && (
        <div className="order-section">
          <h2>Update Order</h2>
          <div className="input-group">
            <label>Kind of Food:</label>
            <input
              type="text"
              value={updatedOrder.kindOfFood}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  kindOfFood: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Quantity:</label>
            <input
              type="text"
              value={updatedOrder.quantity}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  quantity: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Pickup Date and Time:</label>
            <input
              type="text"
              value={updatedOrder.pickupDateTime}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  pickupDateTime: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Personal Information:</label>
            <input
              type="text"
              value={updatedOrder.personalInfo}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  personalInfo: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={updatedOrder.phoneNumber}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input
              type="text"
              value={updatedOrder.address}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  address: e.target.value,
                })
              }
            />
          </div>
          <button onClick={updateOrder}>Update Order</button>
        </div>
      )}

      <p className="read-the-docs">
        This is a simple order management app using React. Click on the logos to
        learn more.
      </p>
    </div>
  );
}

export default App;
