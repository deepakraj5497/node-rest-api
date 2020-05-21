const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

const orders =[{
    foodName: 'chicken',
    foodQuantity: 2,
    customerName: 'Deepak',
    id: 1,
    date: Date()
}];

app.post("/new_order", (req, res) => {
    const order = req.body;
    if(order.foodName && order.customerName && order.foodQuantity){
        orders.push({
            foodName: order.foodName,
            foodQuantity: order.foodQuantity,
            customerName: order.customerName,
            id: orders.length + 1,
            date: Date()
        });
        res.status(200).send({
            success: 'true',
            message: 'order created successfully',
            orders
        });
    } else {
        res.status(401).send({
            message: "Invalid Order creation"
          });
    }
});

app.get("/get_orders", (req, res) => {
    res.status(200).send(orders);
});

app.patch("/order/:id", (req, res) => {
    const order_id = req.params.id;
    const order_update = req.body;
  
    for (let data of orders) {
      if (data.id == order_id) {
        if (order_update.foodName != null){
          data.foodName = order_update.foodName;
        }
        if (order_update.foodQuantity != null){
          data.foodQuantity = order_update.foodQuantity;
        }
        if (order_update.customerName != null){
          data.customerName = order_update.customerName;
        }
        return res.status(200).send({ message: "Updated Succesfully", data: data });
      }
    }
    res.status(404).send({ message: "Invalid Order Id" });
});

app.delete("/delete_order/:id", (req, res) => {
    const order_id = req.params.id;
    console.log(order_id);
    for(let data of orders) {
      if(data.id == order_id){
        orders.splice(orders.indexOf(data), 1);
        return res.status(200).send({
          message: "deleted successfully"
        });
      }
    }

    return res.status(404).send({
      message: "invalid Id"
    });
});

app.listen(port, () => {
    console.log(`running at port ${port}`);
});
