
export default function ProductCard(props) {
    return (
        <div key={props.product.id} className="card p-2 m-2" style={{ width: '200px' }}>
            <img src={props.product.image} className="card-img-top" />
            <div className="card-body">
                <p className="card-text">{props.product.title}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-danger w-100" id={props.product.id}>
                    <span className="bi bi-cart4"></span>Add to Cart
                </button>
            </div>
        </div>
    );
}