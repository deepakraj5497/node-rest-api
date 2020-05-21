import React from 'react';
import axios from 'axios';

class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderList: []
        };
    }
    componentDidMount = () => {   
        axios.get("http://localhost:3200/get_orders").then((response) => {
            let data = response.data.map(data => {
                return data
            })
            console.log(data);
            this.setState({orderList: data});
        })
    }

    componentDidUpdate = () => {   
        axios.get("http://localhost:3200/get_orders").then((response) => {
            let data = response.data.map(data => {
                return data
            })
            this.setState({orderList: data});
        })
    }

    add = () => {
        axios.post('http://localhost:3200/new_order', {
            foodName: 'mutton',
            customerName: 'Raj',
            foodQuantity: 3
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
              console.log(error);
          })
    }

    deletedata (index) {
        const id = parseInt(index + 1);
        console.log(id);
        axios.delete(`http://localhost:3200/delete_order/${id}`).then(res => {
            console.log(res);
            console.log(res.data);
        }, (error) => {
            console.log(error);
        })   
    }

    editdata (index) {
        const id = parseInt(index + 1);
        console.log(id);
        axios.patch(`http://localhost:3200/order/${id}`, {
            foodName: 'pizza',
            customerName: 'Raj',
            foodQuantity: 3})
            .then(res => {
                console.log(res);
                console.log(res.data);
        }, (error) => {
                console.log(error);
        });       
    }

    render(){
        return this.state.orderList.map((data, i) => {
            const{ foodName, foodQuantity, customerName, date } = data;
            return (
                <div>
                    <table>
                        <tbody>
                            <tr key={i}>
                                <td>{foodName}</td>
                                <td>{foodQuantity}</td>
                                <td>{customerName}</td>
                                <td>{date}</td>
                                <td>
                                    <button type="button" onClick={this.deletedata.bind(this,i)}>delete</button>
                                    <button type="button" onClick={this.editdata.bind(this,i)}>edit</button>
                                    <button type="button" onClick={this.add.bind(this,i)}>add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        });
    }
}

export default Order