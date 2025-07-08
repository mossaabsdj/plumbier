"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import LoadingPage from "@/app/component/loading/page";

export default function FarmsPage() {
  const [farms, setFarms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [isloading, setloading] = useState(false);

  // Fetch farms on mount
  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    setloading(true);
    const res = await fetch("/api/Farms");
    const data = await res.json();
    setFarms(data);
    setloading(false);
  };

  const handleEdit = (farm) => {
    setEditingId(farm.id);
    setForm({ name: farm.name });
  };

  const handleAdd = async () => {
    if (!form.name) return;
    setloading(true);
    await fetch("/api/Farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name }),
    });
    setForm({ name: "" });
    setloading(false);
    fetchFarms();
  };

  const handleUpdate = async () => {
    if (!form.name || !editingId) return;
    setloading(true);
    await fetch("/api/Farms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: form.name }),
    });
    setEditingId(null);
    setForm({ name: "" });
    setloading(false);
    fetchFarms();
  };

  const handleDelete = async (id) => {
    setloading(true);
    await fetch("/api/Farms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setloading(false);
    fetchFarms();
  };
  if (!Array.isArray(farms) || farms.length === 0) {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {" "}
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                {" "}
                <Skeleton className="h-4 w-32" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  return (
    <>
      {isloading && <LoadingPage isVisible={true} />}

      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Farms</h2>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Farm Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {editingId ? (
            <Button
              onClick={handleUpdate}
              className="bg-green-600 text-white"
              disabled={isloading}
            >
              {isloading ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              className="bg-black text-white"
              disabled={isloading}
            >
              {isloading ? "Adding..." : "Add"}
            </Button>
          )}
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "" });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms?.map((farm) => (
              <TableRow key={farm.id}>
                <TableCell>{farm.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(farm)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(farm.id)}
                    disabled={isloading}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
