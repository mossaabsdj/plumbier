"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function FarmsPage() {
  const [farms, setFarms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  // Fetch farms on mount
  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    const res = await fetch("/api/Farms");
    const data = await res.json();
    setFarms(data);
  };

  const handleEdit = (farm) => {
    setEditingId(farm.id);
    setForm({ name: farm.name });
  };

  const handleAdd = async () => {
    if (!form.name) return;
    setLoading(true);
    await fetch("/api/Farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name }),
    });
    setForm({ name: "" });
    setLoading(false);
    fetchFarms();
  };

  const handleUpdate = async () => {
    if (!form.name || !editingId) return;
    setLoading(true);
    await fetch("/api/Farms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: form.name }),
    });
    setEditingId(null);
    setForm({ name: "" });
    setLoading(false);
    fetchFarms();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch("/api/farms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    fetchFarms();
  };

  return (
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
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            className="bg-black text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
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
          {farms.map((farm) => (
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
                  disabled={loading}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
