"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowDown, ArrowUp, Loader2, Trash } from "lucide-react";
import defaultdata from "@/app/Texts/content.json";
import { fetchData } from "@/lib/FetchData/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Page = ({ objects, data, AddModel, ViewModel }) => {
  const [open, setOpen] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [openStatsModel, setOpenStatsModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null); // "all", "waiting", "valider", "rejeter"
  const [object, setobject] = useState(objects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [sortConfig, setSortConfig] = useState({
    key: "Date",
    direction: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const Labels = defaultdata.Labels;

  const columns = data.table.columns;
  const handleStats = () => {
    setOpenStatsModel(true);
  };
  const handleSort = (col) => {
    if (!col.sortable) return;

    setSortConfig((prev) => {
      if (prev.key === col.accessor) {
        return {
          key: col.accessor,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: col.accessor, direction: "asc" };
    });
  };
  const handleAdd = () => {
    setOpen(true);
  };
  const handleView = (row) => {
    setSelectedProduct(row); // Pass the row object to the modal

    setOpenViewModel(true);
  };
  const handleValider = async (row) => {
    row.status = true;
    const r = await fetchData({
      method: "PUT",
      body: row,
      url: "/api/Commande/" + row.id,
    });
    await loadData();
  };
  const handleRejeter = async (row) => {
    row.status = false;
    const r = await fetchData({
      method: "PUT",
      body: row,
      url: "/api/Commande/" + row.id,
    });
    await loadData();
  };
  const handleReverifie = async (row) => {
    row.status = null;
    const r = await fetchData({
      method: "PUT",
      body: row,
      url: "/api/Commande/" + row.id,
    });
    await loadData();
  };
  const loadData = async () => {
    setLoading(true);
    const C = await fetchData({ method: "GET", url: "/api/Commande" });
    setobject(C);
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const filteredData = object.filter((row) => {
    const matchesSearch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const rowDate = new Date(row.Date);
    const selected = selectedDate ? new Date(selectedDate) : null;

    if (selected) {
      selected.setHours(0, 0, 0, 0);
      rowDate.setHours(0, 0, 0, 0);
    }

    const matchesDate = !selected || rowDate.getTime() === selected.getTime();

    const matchesStatus = statusFilter === "all" || row.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });
  const sortedData = [...filteredData];

  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      // If sorting by a date field, convert to Date objects
      if (sortConfig.key.toLowerCase().includes("date")) {
        return sortConfig.direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      // Fallback for normal values
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 items-center justify-center">
      <div className="w-full max-w-8xl flex flex-col h-[90vh] bg-white rounded-lg shadow border border-gray-200">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 text-center pt-6">
          {data.title}
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6 px-6">
          <Input
            placeholder={data.table.SearchPlaceHolder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>{Labels.pickdata}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            + {Labels.Add}
          </Button>
          <Button onClick={handleStats} variant="secondary" className="w-full">
            📊 {Labels.Stats}
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 mb-4 px-6">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            {Labels.Tous || "Tous"}
          </Button>
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            onClick={() => setStatusFilter(null)}
          >
            {Labels.Waiting || "En attente"}
          </Button>
          <Button
            variant={statusFilter === true ? "default" : "outline"}
            onClick={() => setStatusFilter(true)}
          >
            {Labels.Verified || "Validés"}
          </Button>
          <Button
            variant={statusFilter === false ? "default" : "outline"}
            onClick={() => setStatusFilter(false)}
          >
            {Labels.Rejected || "Rejetés"}
          </Button>
        </div>

        {/* Table (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-black mb-4" />
              <span className="text-lg text-gray-700">Loading...</span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                <Table className="min-w-full divide-y divide-gray-200">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="px-3 py-2 font-semibold text-gray-700">
                        ID
                      </TableHead>
                      {columns.map((col) => (
                        <TableHead
                          key={col.accessor}
                          onClick={() => handleSort(col)}
                          className={`px-3 py-2 font-semibold text-gray-700 cursor-pointer select-none ${
                            col.sortable
                              ? "hover:underline"
                              : "text-muted-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {col.label}
                            {col.sortable &&
                              sortConfig.key === col.accessor &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUp size={14} />
                              ) : (
                                <ArrowDown size={14} />
                              ))}
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="px-3 py-2 text-right font-semibold text-gray-700">
                        {Labels.Actions}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="px-3 py-2">{row.id}</TableCell>
                        {columns.map((col) => (
                          <TableCell
                            key={col.accessor}
                            className="px-3 py-2 align-middle"
                          >
                            {col.accessor === "date" ||
                            col.accessor === "Date" ? (
                              format(new Date(row[col.accessor]), "yyyy-MM-dd")
                            ) : col.accessor === "status" ? (
                              <span
                                className={`font-semibold ${
                                  row.status === true
                                    ? "text-green-600"
                                    : row.status === false
                                    ? "text-red-600"
                                    : "text-gray-500"
                                }`}
                              >
                                {row[col.accessor] === true
                                  ? "valider"
                                  : row[col.accessor] === false
                                  ? "rejeter"
                                  : "waiting"}
                              </span>
                            ) : (
                              row[col.accessor]
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="px-3 py-2 text-right space-x-2">
                          {row.status === null ? (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleValider(row)}
                              >
                                {Labels.Valider}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRejeter(row)}
                              >
                                {Labels.rejeter}
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-600 border-gray-400 hover:bg-gray-100"
                              onClick={() => handleReverifie(row)}
                            >
                              {Labels.Re_vérifier}
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            className="p-2"
                            onClick={() => {
                              setSelectedDeleteId(row.id);
                              setOpenDeleteDialog(true);
                            }}
                          >
                            <Trash className="w-4 h-4 text-white" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {sortedData.length === 0 && (
                <p className="text-center text-muted-foreground mt-4">
                  No results found.
                </p>
              )}
              <AddModel
                open={open}
                onClose={() => setOpen(false)}
                data={data}
                loadData={loadData}
              />
              <ViewModel
                open={openViewModel}
                onClose={() => setOpenViewModel(false)}
                product={selectedProduct}
              />
            </>
          )}
        </div>
      </div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. Do you really want to delete this
            commande?
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setLoading(true);
                await fetch(`/api/Commande/${selectedDeleteId}`, {
                  method: "DELETE",
                });
                setOpenDeleteDialog(false);
                setSelectedDeleteId(null);
                toast.success("Commande deleted!");
                await loadData();
                setLoading(false);
              }}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
