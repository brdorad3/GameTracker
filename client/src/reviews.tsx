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
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_URL}/reviews`,
                { user }
            );
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchGames = async () => {
        try {
            if (data.length === 0) return; // Skip if there's no data

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
            const data3 = data2.map((item) => item[0] || {}); // Handle undefined or missing data
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

            const six = new Array(6)

            for(let i = 0; i<6; i++){
                six.push(all[i])
            }

            setRes(six);
            setLoading(false); // Set loading to false once data is fetched
        } catch (e) {
            console.log(e);
            setLoading(false);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-64 py-12 flex flex-col gap-12">
            <h1 className="text-sec text-4xl">Your Reviews</h1>
            <div className="flex gap-[1.375rem] ">
                {user ? (
                    res && res.length > 0 ? (
                        res.map((game: any) => (
                            <Link
                                to={`/detail/${game.id}`}
                                state={game.id}
                                key={game.id}
                                className="bg-sec rounded-sm min-w-[210px]"
                            >
                                <div className="bg-sec rounded-md">
                                    {game.cover && (
                                        <img
                                            src={game.cover}
                                            className="w-full h-[250px]"
                                            alt=""
                                        />
                                    )}

                                    <div className="py-2">
                                        <p className="overflow-hidden text-nowrap text-ellipsis text-prim patrick text-2xl p-2">
                                            {game.game}
                                        </p>
                                        {game.rating ? (
                                            <div className="py-[5px] px-3 mb-2 flex justify-between items-center bg-sec rounded-xl">
                                                <p className="text-prim chakra">
                                                    {game.status}
                                                </p>
                                                <div className="flex gap-1 items-center">
                                                    <p className="text-prim">
                                                        {game.rating}
                                                    </p>
                                                    <Icon
                                                        path={mdiStar}
                                                        size={0.8}
                                                        className="text-prim"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-[5px] px-3 bg-sec float-end flex items-center rounded-xl mb-2 mr-2">
                                                <p className="text-prim">
                                                    N/A
                                                </p>
                                                <Icon
                                                    path={mdiStar}
                                                    size={0.8}
                                                    className="text-prim"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
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
