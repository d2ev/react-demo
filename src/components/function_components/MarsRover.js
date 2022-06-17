import { useEffect, useState } from "react";

export default function MarsRoverAPI() {

    const [roverData, setroverData] = useState({ photos: [] });

    useEffect(() => {
        fetch("http://localhost:3000/localData/photos.json")
            .then(response => response.json())
            .then(data => {
                setroverData(data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <h2> Mars Rover Imanges</h2>
            <div className="container-fluid d-flex flex-wrap">
                {
                    roverData.photos.map(photo =>
                        <div key={photo.id}   className="card p-2 m-2" style={{width:"18rem"}}>
                            <img className="card-img-top" src={photo.img_src} />
                            <div className="card-body">
                                <h5 className="card-title">{photo.camera.full_name}</h5>
                            </div>
                        </div>

                    )
                }
        </div>
        </div>


    )
}