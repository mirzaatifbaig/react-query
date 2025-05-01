import axios from "../axios.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Loading from "@/components/Loading";

const getJobById = async ({queryKey}) => {
    const [_key, id] = queryKey;
    const response = await axios.get(`/jobs/${id}`);
    return response.data;
};

const JobById = () => {
    const [inputId, setInputId] = useState(1);
    const [queryId, setQueryId] = useState(1);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (inputId > 0) setQueryId(inputId);
        }, 500);
        return () => clearTimeout(timeout);
    }, [inputId]);

    const {data, isLoading, isError} = useQuery({
        queryKey: ["jobs", queryId],
        queryFn: getJobById,
        enabled: queryId > 0,
    });

    const increment = () => setInputId((prev) => prev + 1);
    const decrement = () => setInputId((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg  font-semibold">Post Viewer</h3>
                <div className="flex space-x-2 items-center">
                    <Button
                        variant="outline"
                        className={"text-white hover:text-white"}
                        onClick={decrement}
                        disabled={inputId <= 1}
                    >
                        Prev
                    </Button>
                    <Input
                        type="number"
                        value={inputId}
                        onChange={(e) => setInputId(Number(e.target.value))}
                        className="block w-fit mx-auto items-center"
                        min={1}
                    />
                    <Button onClick={increment}>Next</Button>
                </div>
            </div>

            {isLoading && <Loading/>}

            {isError || !data ? (
                <p className="text-red-500">Post not found.</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>{data.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {data.job}
                        </p>
                        <p className="text-sm">{data.type}</p>
                        <p className="text-sm">{data.area}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default JobById;
