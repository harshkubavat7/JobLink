import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React, { use, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { companies,searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
        const filteredCompany =companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText) return true;

            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
  },[companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {!Array.isArray(companies) || companies.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4}>You haven't registered any company</TableCell>
    </TableRow>
  ) : (
    filterCompany.map((company) => (
      <TableRow key={company._id}>
        <TableCell>
          <Avatar>
            <AvatarImage src={company.logo || "https://default.logo.url"} />
          </Avatar>
        </TableCell>
        <TableCell>{company.name}</TableCell>
        <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
        <TableCell className="text-right cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                <Edit2 className="w-4" />
                <span>Edit</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

      </Table>
    </div>
  );
}

export default CompaniesTable;
