import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../api/api";

export const FetchPost = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        // gcTime: 30000,
        // staleTime : 5000,
        // placeholderData: keepPreviousData
    })

    if (isPending) return <div className="text-white">Loading....</div> 
    if (isError) return <div className="text-white">Error: {error.message || "Something went wrong!"}</div> 

    return (
        <div>
            <ul className="section-accordion">
                {data?.map((curElem:any) => {
                    const { id, title, body } = curElem;
                    return (
                        <li key={id}>
                            <NavLink to={`/rq/${id}`}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>)
}