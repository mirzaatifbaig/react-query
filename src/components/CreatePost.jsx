import {useState} from "react";
import axios from "../axios.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { toast } from "sonner"
import {useNavigate} from "react-router-dom";
const createPost = async (newPost) => {
    const response = await axios.post("/jobs", newPost);
    console.log(response.data);
    return response.data;
};

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [job, setJob] = useState("");
    const [type, setType] = useState("");
    const [area, setArea] = useState("and");
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: createPost,
        onMutate: async (newPost) => {
            await queryClient.cancelQueries(["jobs"]);
            const previousJobs = queryClient.getQueryData(["jobs"]);
            const fakePost = {id: Date.now(), ...newPost};
            queryClient.setQueryData(["jobs"], (old) => [...(old || []), fakePost]);
            return {previousJobs, fakePost};
        },
        onSuccess: (data, _, context) => {
            queryClient.setQueryData(["jobs"], (old) =>
                old.map((job) => (job.id === context.fakePost.id ? data : job))
            );

            toast(`Job ${data.title} created successfully in ${data.area}.`);
        },
        onError: (_, __, context) => {
            if (context?.previousJobs) {
                queryClient.setQueryData(["jobs"], context.previousJobs);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(["jobs"]);
            navigate("/");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({title, job, type, area});
    };

    return (
        <Card className="max-w-md mx-auto my-6">
            <CardHeader>
                <CardTitle>Create New Job</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Input
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        placeholder="Job"
                    />
                    <Input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Type"
                    />
                    <Input
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Area"
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreatePost;
