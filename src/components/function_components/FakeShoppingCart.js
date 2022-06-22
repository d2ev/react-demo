import { Toast } from "bootstrap";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FakeStore() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    function getProducts(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            });
    }

    function getCategories() {
        fetch("http://localhost:3000/localData/fake-product-cat.json")
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }

    useEffect(() => {
        getProducts("http://localhost:3000/localData/fake-products.json");
        getCategories()
    }, [cartItems.length])

    function handleCategoryChange(e) {
        getProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
    }

    function handlerAddtoCart(e) {
        fetch(`https://fakestoreapi.com/products/${e.target.id}`)
            .then(response => response.json())
            .then(data => {
                cartItems.push(data);
                setCartItems(cartItems);
                updateCartItemsCount();
                updateCartTotal();
                console.log("item added to cart");
            })
    }

    function updateCartItemsCount() {
        setCartItemCount(cartItems.length);
    }

    function updateCartTotal() {
        let total = 0
        cartItems.map((item) => {
            total = total + item.price
        })
        setCartTotal(total);
    }

    function handleRemoveFromCart(e) {
        let index = ''
        cartItems.map((cartItem) => {
            if (cartItem.id == e.target.id) {
                index = cartItems.indexOf(cartItem);
            }
        })
        if (index != undefined) {
            cartItems.splice(index, 1);
            updateCartItemsCount();
            updateCartTotal();
            console.log("item removed from cart");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <label>Product Categories</label>
                    <select className="form-control" onChange={handleCategoryChange}>
                        {
                            categories.map(cat =>
                                <option key={cat} value={cat}>{cat}</option>
                            )
                        }
                    </select>

                </div>
                <div className="col-6 d-flex flex-wrap">
                    {
                        products.map(product =>
                            // ProductCar handlerAddtoCart won't work. find solution ?
                            // <ProductCard key={product.id} product={product} />
                            <div key={product.id} className="card p-2 m-2" style={{ width: '200px' }}>
                            <img src={product.image} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">{product.title}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger w-100" id={product.id} onClick={handlerAddtoCart}>
                                    <span className="bi bi-cart4"></span>Add to Cart
                                </button>
                            </div>
                        </div>
                        )
                    }
                </div>
                <div className="col-3">
                    <span>Number of item on cart: </span> {cartItemCount}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button id={item.id} onClick={handleRemoveFromCart} className="btn btn-danger w-100"><span className="bi bi-trash"></span></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div>Cart Total: {cartTotal}</div>
                </div>
            </div>
        </div>
    )
}