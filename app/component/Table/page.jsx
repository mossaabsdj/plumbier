"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // optional success toast

import React, { useState, useEffect } from "react";
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
import { CalendarIcon, ArrowDown, ArrowUp } from "lucide-react";
import defaultdata from "@/app/Texts/content.json";
import { fetchData } from "@/lib/FetchData/page";

const Page = ({ object, data, AddModel, ViewModel }) => {
  const [open, setOpen] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [openStatsModel, setOpenStatsModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(object); // start with props
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // or 'error'

  const Labels = defaultdata.Labels;

  const columns = data.table.columns;
  const handleStats = () => {
    setOpenStatsModel(true);
  };
  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => {
        setShowDialog(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

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
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/Product/${selectedId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        handleReload();
        setDialogType("success");
        setDialogMessage("Product deleted successfully!");
      } else {
        setDialogType("error");
        setDialogMessage("Failed to delete product.");
        console.error("Failed to delete", await res.text());
      }
    } catch (error) {
      setDialogType("error");
      setDialogMessage("Error deleting product.");
      console.error("Error deleting row:", error);
    } finally {
      setShowDialog(true);
      setOpenDialog(false); // close confirmation dialog
    }
  };

  const handleReload = async () => {
    setOpen(false);
    const updatedProducts = await fetchData({
      method: "GET",
      url: "/api/Product",
    });
    setProducts(updatedProducts); // ✅ this triggers re-render
  };

  const handleView = (row) => {
    setSelectedProduct(row); // Pass the row object to the modal

    setOpenViewModel(true);
  };
  const filteredData = products.filter((row) => {
    const matchesSearch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const rowDate = new Date(row.Date);
    const selected = selectedDate ? new Date(selectedDate) : null;

    if (selected) {
      // Normalize both dates to midnight for accurate day-level comparison
      selected.setHours(0, 0, 0, 0);
      rowDate.setHours(0, 0, 0, 0);
    }

    const matchesDate = !selected || rowDate.getTime() === selected.getTime();

    return matchesSearch && matchesDate;
  });

  const sortedData = [...filteredData];

  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="p-2 w-full sm:p-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6 w-full max-w-full">
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

      <div className="w-full flex justify-center">
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white max-w-full">
          <Table className="w-full min-w-[600px] divide-y divide-gray-200">
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
                      col.sortable ? "hover:underline" : "text-muted-foreground"
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
                      {col.accessor === "Date" ? (
                        format(new Date(row[col.accessor]), "yyyy-MM-dd")
                      ) : col.accessor === "farm" ? (
                        row.farm?.name || "N/A"
                      ) : col.accessor === "emballage" ? (
                        Array.isArray(row?.emballages) &&
                        row.emballages.length > 0 ? (
                          <select
                            className="border rounded px-2 py-1 bg-gray-50"
                            value={
                              typeof row.emballages[0] === "object"
                                ? row.emballages[0].name
                                : row.emballages[0]
                            }
                            style={{ minWidth: 100 }}
                          >
                            {row.emballages.map((emb, idx) => (
                              <option
                                key={idx}
                                value={typeof emb === "object" ? emb.name : emb}
                              >
                                {typeof emb === "object" ? emb.name : emb}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "N/A"
                        )
                      ) : col.accessor === "image" ? (
                        row.image ? (
                          <img
                            src={row.image}
                            alt="product"
                            className="rounded shadow border"
                            style={{
                              maxWidth: 60,
                              maxHeight: 40,
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          "N/A"
                        )
                      ) : (
                        row[col.accessor]
                      )}
                    </TableCell>
                  ))}

                  <TableCell className="px-3 py-2 text-right flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(row)}
                    >
                      {Labels.View}
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedId(row.id);
                        setOpenDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {sortedData.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No results found.
        </p>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. Do you really want to delete this
            product?
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "error" ? "❌ Error" : "✅ Success"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">{dialogMessage}</p>
          <DialogFooter>
            <Button variant="default" onClick={() => setShowDialog(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddModel open={open} onClose={handleReload} data={data} />
      <ViewModel
        open={openViewModel}
        onClose={() => setOpenViewModel(false)}
        product={selectedProduct}
        reload={handleReload}
      />
    </div>
  );
};

export default Page;
