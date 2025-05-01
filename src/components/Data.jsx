import axios from "../axios.jsx";
import {useQuery} from "@tanstack/react-query";
import PostGrid from "@/components/PostGrid";
import Loading from "@/components/Loading";

const getJobs = async () => {
    const response = await axios.get("/jobs");
    return response.data;
};
const Data = () => {
    const {
        data: jobs,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
    });

    if (isLoading) return <Loading/>;
    if (isError) return <p>Error loading jobs.</p>;

    return (
        <div>
            <PostGrid posts={jobs}/>
        </div>
    );
};

export default Data;
