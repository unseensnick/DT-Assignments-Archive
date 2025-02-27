import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                        Welcome to Your Project
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8">
                        A modern web application built with Tailwind CSS and
                        shadcn/ui
                    </p>

                    <div className="flex justify-center space-x-4 mb-12">
                        <Button variant="default">Get Started</Button>
                        <Button variant="outline">Learn More</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-accent-foreground">
                                    Feature One
                                </CardTitle>
                                <CardDescription>
                                    Explore our first amazing feature
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-accent-foreground">
                                    Feature Two
                                </CardTitle>
                                <CardDescription>
                                    Discover the power of our second feature
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Sed do eiusmod tempor incididunt ut labore
                                    et dolore magna aliqua.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-accent-foreground">
                                    Feature Three
                                </CardTitle>
                                <CardDescription>
                                    Unlock the potential of our third feature
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
