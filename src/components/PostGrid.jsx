import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {X} from "lucide-react";

// Delete a job post API function
const deletePost = async (id) => {
    await axios.delete(`/jobs/${id}`);
};

// PostGrid component to display posts with a remove button
const PostGrid = ({posts}) => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: deletePost,
        onMutate: async (id) => {
            // Cancel any outgoing queries to prevent race conditions
            await queryClient.cancelQueries(["jobs"]);

            // Get the previous state of the jobs to roll back if needed
            const previousJobs = queryClient.getQueryData(["jobs"]);

            // Optimistically update the cache: remove the post immediately from the UI
            queryClient.setQueryData(["jobs"], (old) =>
                old.filter((post) => post.id !== id),
            );

            // Return the previous state so we can roll back in case of error
            return {previousJobs};
        },
        onError: (err, id, context) => {
            // Rollback to the previous state if the mutation fails
            if (context?.previousJobs) {
                queryClient.setQueryData(["jobs"], context.previousJobs);
            }
        },
        onSettled: () => {
            // Refetch the job list to make sure it's updated in case of success or failure
            queryClient.invalidateQueries(["jobs"]);
        },
    });

    return (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    className="flex w-70 flex-col items-center justify-center"
                >
                    <CardHeader className="flex w-full justify-between items-center mb-2">
                        <CardTitle className="text-center">{post.title}</CardTitle>
                        <Button
                            onClick={() => mutate(post.id)} // Trigger the delete
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white hover:border-1 hover:border-black hover:text-red-500"
                        >
                            <X/>
                        </Button>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            {post.job}
                        </p>
                        <p className="text-sm">{post.type}</p>
                        <p className="text-sm">{post.area}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PostGrid;
