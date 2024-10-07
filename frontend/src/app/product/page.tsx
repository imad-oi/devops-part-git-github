"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1", price: 100, description: "Description 1", category: "Category 1", quantity: 50 },
    { id: 2, name: "Item 2", price: 200, description: "Description 2", category: "Category 2", quantity: 30 }
  ]);

  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const addItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: Math.floor(Math.random() * 500),
      description: `Description ${items.length + 1}`,
      category: `Category ${items.length + 1}`,
      quantity: Math.floor(Math.random() * 100)
    };
    setItems([...items, newItem]);
  };

  const editItem = (id: number) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    }
  };

  const saveEditedItem = () => {
    if (editingItem) {
      const updatedItems = items.map(item =>
        item.id === editingItem.id ? editingItem : item
      );
      setItems(updatedItems);
      setEditingItem(null);
    }
  };

  const deleteItem = (id: number) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button onClick={addItem} className="bg-green-500 hover:bg-green-600">
              Add New Item
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Category</TableHead>
                  <TableHead className="font-bold">Quantity</TableHead>
                  <TableHead className="font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => editItem(item.id)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit item</DialogTitle>
                              <DialogDescription>
                                Make changes to the item here. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value={editingItem?.name || ''}
                                  onChange={(e) => setEditingItem(editingItem ? {...editingItem, name: e.target.value} : null)}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                  Price
                                </Label>
                                <Input
                                  id="price"
                                  type="number"
                                  value={editingItem?.price || 0}
                                  onChange={(e) => setEditingItem(editingItem ? {...editingItem, price: Number(e.target.value)} : null)}
                                  className="col-span-3"
                                />
                              </div>
                              {/* Add more fields here as needed */}
                            </div>
                            <DialogFooter>
                              <Button onClick={saveEditedItem}>Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="icon" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductList;