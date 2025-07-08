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
import LoadingPage from "@/app/component/loading/page";

export default function ParametrePage() {
  const [admin, setAdmin] = useState({ user: "", password: "" });
  const [form, setForm] = useState({ user: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Fetch admin data on mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/Admin")
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
        setForm(data);
        setLoading(false);

        setIsNew(!data.user); // If no user, it's new
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/Admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setAdmin(data);
    setIsNew(false);
    setLoading(false);
  };

  return (
    <>
      {" "}
      {loading && <LoadingPage isVisible={true} />}
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Parameters</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>{admin?.user}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>{admin?.password}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-6 space-y-4">
          <Input
            placeholder="Username"
            value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            className="bg-black text-white w-full"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : isNew ? "Add Admin" : "Update Admin"}
          </Button>
        </div>
      </div>{" "}
    </>
  );
}
