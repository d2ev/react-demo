import React from "react"

export default class ClassFakeStore extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            categories: [],
            cartItems: [],
            cartLength: 0,
            cartTotal: 0
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
    }

    componentDidMount() {
        this.loadProducts("http://localhost:3000/localData/fake-products.json");
        this.loadCategories();
    }

    loadProducts(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    products: data
                })
            });
    }
    loadCategories() {
        fetch("http://localhost:3000/localData/fake-product-cat.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    categories: data
                })
            });
    }

    handleCategoryChange(e) {
        this.loadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
    }

    handleAddToCart(e) {
        fetch(`https://fakestoreapi.com/products/${e.target.id}`)
            .then(response => response.json())
            .then(data => {
                this.state.cartItems.push(data);
                this.setState({
                    cartItems: this.state.cartItems
                })
                this.setState({
                    cartLength: this.state.cartItems.length
                })
                this.calculateCartTotal()
                console.log("item added to cart");
            })
    }

    calculateCartTotal() {
        let total = 0
        this.state.cartItems.map(cartItem =>
            total = total + cartItem.price
        )
        this.setState({
            cartTotal: total
        })
    }

    handleRemoveCartItem(e) {
        let index = ''
        this.state.cartItems.forEach(cartItem => {
            if (cartItem.id === e.target.id) {
                index = this.state.cartItems.indexOf(cartItem);
            }
        })
        if (index !== undefined) {
            this.state.cartItems.splice(index, 1);
            this.setState({
                cartLength: this.state.cartItems.length
            })
            this.calculateCartTotal()
            console.log("item removed from cart");
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <header className="bg-danger text-white text-center p-2">
                    <h2>
                        <span className="bi bi-cart"></span> Shopping Cart
                    </h2>
                </header>
                <div className="row">
                    <div className="col-3">
                        <select className="form-select" onChange={this.handleCategoryChange}>
                            <option value="">All</option>
                            {
                                this.state.categories.map(category =>
                                    <option key={category} value={category}>{category}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-6 d-flex flex-wrap">
                        {
                            this.state.products.map(product =>
                                <div key={product.id} className="card p-2 m-2" style={{ width: '200px' }}>
                                    <img src={product.image} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{product.title}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger w-100" id={product.id} onClick={this.handleAddToCart}>
                                            <span className="bi bi-cart4"></span>Add to Cart
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-3">
                        <div className="text-center"><h3>Cart({this.state.cartLength})</h3></div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cartItems.map(cartItem =>
                                        <tr key={cartItem.key}>
                                            <td>{cartItem.title}</td>
                                            <td>{cartItem.price}</td>
                                            <td>
                                                <button id={cartItem.id} className="btn btn-danger" onClick={this.handleRemoveCartItem}>
                                                    <span className="bi bi-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="">
                            
                            <h5>Cart Total: <span className="badge bg-secondary">{this.state.cartTotal}</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}