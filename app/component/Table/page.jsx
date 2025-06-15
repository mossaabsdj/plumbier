"use client";

import React, { useState } from "react";
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

const Page = ({
  object,
  data,
  AddModel,

  ViewModel,
  StatsModel,
}) => {
  const [open, setOpen] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [openStatsModel, setOpenStatsModel] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
    setSelectedClient(row); // Pass the row object to the modal

    setOpenViewModel(true);
  };
  const filteredData = object.filter((row) => {
    const matchesSearch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || new Date(row.Date) >= selectedDate;

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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      <div className="flex gap-4 items-center mb-4">
        <Input
          placeholder={data.table.SearchPlaceHolder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
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
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          + {Labels.Add}
        </Button>

        <Button
          onClick={() => {
            setOpenStatsModel(true);
          }}
          variant="secondary"
        >
          📊 {Labels.Stats}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.accessor}
                onClick={() => handleSort(col)}
                className={`cursor-pointer ${
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
            <TableHead className="text-right">{Labels.Actions}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              {columns.map((col) => (
                <TableCell key={col.accessor}>
                  {col.accessor === "date"
                    ? format(new Date(row[col.accessor]), "yyyy-MM-dd")
                    : row[col.accessor]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleView(row);
                  }}
                >
                  {Labels.View}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sortedData.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No results found.
        </p>
      )}
      <AddModel data={data} open={open} onClose={() => setOpen(false)} />
      <ViewModel
        open={openViewModel}
        onClose={() => setOpenViewModel(false)}
        client={selectedClient}
      />
      <StatsModel
        open={openStatsModel}
        setOpen={setOpenStatsModel}
        onClose={() => setOpenStatsModel(false)}
      />
    </div>
  );
};

export default Page;
