"use client";

import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";

// Validation schema using Zod
const formSchema = z.object({
    id: z.string().min(1, {
        message: "Name must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z.number().min(0, {
        message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    quantity: z.number().int().min(0, {
        message: "Quantity must be a positive integer.",
    }),
});

interface UpdateProductProps {
    productId: string;  // The product ID should be passed as a prop
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ productId }) => {
    // const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { id: 1, name: "Item 1", price: 100, description: "Description 1", category: "Category 1", quantity: 50 },
    });

    // Fetch the product data to prefill the form
    useEffect(() => {
        form.reset({ id: 1, name: "Item 1", price: 100, description: "Description 1", category: "Category 1", quantity: 50 });
        // const fetchProduct = async () => {
        //     try {
        //         const response = await fetch(`/api/products/${productId}`);
        //         if (response.ok) {
        //             const product = await response.json();
        //             form.reset(product);  // Populate the form with the fetched product data
        //         } else {
        //             throw new Error("Failed to fetch product");
        //         }
        //     } catch (error: any) {
        //         console.error("There was a problem fetching the product.");
        //     }
        // };

        // fetchProduct();
    }, [productId, form]);

    // Handle form submission for updating the product
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                console.log("Your product has been updated successfully.");
                form.reset();
                // router.push('/products'); // Redirect to products list page after successful update
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error: any) {
            console.error("There was a problem updating the product.");
            // toast({
            //   title: "Error",
            //   description: "There was a problem updating the product.",
            //   variant: "destructive",
            // });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name of product</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter price"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter product description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product category" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter quantity"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Update Product</Button>
                </form>
            </Form>
        </div>
    );
};

export default UpdateProduct;
