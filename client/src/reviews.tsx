import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

const Reviews = () => {
    const { user } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [res, setRes] = useState<any[]>([]);
    const [seeAll, setSeeAll] = useState<any[]>([]);
    

    const fetchReviews = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_URL}/reviews`,
                { user }
            );
            setData(response.data);
            console.log(data)
        } catch (e) {
            console.log(e);
        }
    };

    const fetchGames = async () => {
        try {
            if (data.length === 0) return; 

            const response = await Promise.all(
                data.map((slot: any) => {
                    return fetch(
                        "http://localhost:8080/https://api.igdb.com/v4/games",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Client-ID": "28k8glj9djgyr0opcwll92beduld5h",
                                Authorization:
                                    "Bearer fos399vwik27rr0m3tprazhvafx4zj",
                            },
                            body: `fields name, cover.url ;
                                   where name = "${slot.game}";`,
                        }
                    );
                })
            );

            const data2 = await Promise.all(response.map((res) => res.json()));
            const data3 = data2.map((item) => item[0] || {}); 
            const gamesWithCovers = data3.map((slot: any) => ({
                ...slot,
                coverUrl: slot.cover
                    ? slot.cover.url.replace("t_thumb", "t_cover_big")
                    : "",
            }));

            const all = data.map((slot: any, index) => ({
                ...slot,
                cover: gamesWithCovers[index]?.coverUrl || "N/A",
                id: gamesWithCovers[index]?.id || "",
               
            }));
            
            const six = []
            
            for(let i = 0; i<6; i++){
                six.push(all[i])
            }
            if(all.length > 6){
                setRes(six)
            }
            else{
                setRes(all)
            }
           console.log(all)
            setSeeAll(all)
        } catch (e) {
            console.log(e);
            
        }
    };

    useEffect(() => {
        if (user) {
            fetchReviews();
        }
    }, [user]);

    useEffect(() => {
        fetchGames();
    }, [data]);

    

    return (
        <div className="px-64 py-12 flex flex-col gap-12">
            <div className="flex justify-between">
                <div>
            <h1 className="text-sec text-3xl chakra pb-1 font-bold">YOUR REVIEWS</h1>
            <div className="w-24 h-[2px] bg-acc"></div>
            </div>
            <div className="flex flex-col justify-end"> 
            {res && res.length > 0 &&
            <Link to="/myreviews" state={seeAll} className="text-sec border-b-[1px] hover:border-sec chakra"> <p className="">See all</p> </Link>
            
            }
            
            
            </div>
            </div>
            <div className="flex justify-between">
                {user ? (
                    res && res.length > 0 ? (
                        res.map((game: any) => (
                            
                                <div className="bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh3">
                                    <Link
                                to={`/detail/${game.id}`}
                                state={game.id}
                                key={game.id}
                                className=""
                            >
                                    {game.cover && (
                                        <img
                                            src={game.cover}
                                            className="w-full h-[250px]"
                                            alt=""
                                        />
                                    )}
                                </Link>
                                    <div className="py-2">
                                    <Link
                                to={`/detail/${game.id}`}
                                state={game.id}
                                key={game.id}
                                className=""
                            >
                                        <p className="overflow-hidden text-nowrap text-ellipsis text-prim patrick text-2xl p-2">
                                            {game.game}
                                        </p>
                                        </Link>
                                        {game.rating !== undefined && game.rating !== null ? (
    <div className="py-[5px] px-3 mb-2 flex justify-between items-center bg-sec rounded-xl">
        <p className="text-prim chakra">
            {game.status}
        </p>
        <div className="flex gap-1 items-center">
        <Icon
                path={mdiStar}
                size={0.8}
                className="text-acc"
            />
            <p className="text-prim ">
                {game.rating === 0 ? "N/A" : game.rating}
            </p>
           
        </div>
    </div>
) : (
    <div className="py-[5px] px-3 bg-sec float-end flex items-center rounded-xl mb-2 mr-2">
         <Icon
                path={mdiStar}
                size={0.8}
                className="text-acc"
            />
        <p className="text-prim">
            N/A
        </p>
       
    </div>
)}

                                    </div>
                                </div>
                            
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )
                ) : (
                    <p>No user logged in.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
