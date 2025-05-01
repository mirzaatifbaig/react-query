import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold text-destructive">
                        404
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-muted-foreground">Page Not Found</p>
                    <Link to={"/"}>
                        <Button className={"text-white hover:text-white"} variant="outline">
                            Go Home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default Error;
