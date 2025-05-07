
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Mock student data
const students = [
  {
    id: "2901",
    photo: "/lovable-uploads/8d712122-4904-4dbb-b449-decfce361011.png",
    name: "Richi Rozario",
    gender: "Female",
    parentName: "David Smith",
    class: "1",
    section: "A",
    address: "1A-110, North Sydney",
    dob: "10/03/2010",
    mobile: "+8812 00 5098",
    email: "ndisons@gmail.com",
    feesStatus: "Paid",
    arrearsAmount: 0
  },
  {
    id: "2902",
    photo: "/lovable-uploads/8d712122-4904-4dbb-b449-decfce361011.png",
    name: "Kazi Fahim",
    gender: "Male",
    parentName: "Mike Hussy",
    class: "2",
    section: "B",
    address: "59 street, North Sydney",
    dob: "10/03/2010",
    mobile: "+8812 00 5098",
    email: "ndisons@gmail.com",
    feesStatus: "Partial",
    arrearsAmount: 150
  },
  {
    id: "2903",
    photo: "/lovable-uploads/8d712122-4904-4dbb-b449-decfce361011.png",
    name: "Richi Rozario",
    gender: "Female",
    parentName: "David Smith",
    class: "1",
    section: "A",
    address: "1A-110, North Sydney",
    dob: "10/03/2010",
    mobile: "+8812 00 5098",
    email: "ndisons@gmail.com",
    feesStatus: "Pending",
    arrearsAmount: 320
  },
  {
    id: "2904",
    photo: "/lovable-uploads/8d712122-4904-4dbb-b449-decfce361011.png",
    name: "Kazi Fahim",
    gender: "Male",
    parentName: "Mike Hussy",
    class: "2",
    section: "B",
    address: "59 street, North Sydney",
    dob: "10/03/2010",
    mobile: "+8812 00 5098",
    email: "ndisons@gmail.com",
    feesStatus: "Paid",
    arrearsAmount: 0
  },
  {
    id: "2905",
    photo: "/lovable-uploads/8d712122-4904-4dbb-b449-decfce361011.png",
    name: "Richi Rozario",
    gender: "Female",
    parentName: "David Smith",
    class: "1",
    section: "C",
    address: "90 Street, Heaxy, Reola",
    dob: "10/03/2010",
    mobile: "+8812 00 5098",
    email: "ndisons@gmail.com",
    feesStatus: "Paid",
    arrearsAmount: 0
  }
];

const AllStudents = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedFeesStatus, setSelectedFeesStatus] = useState<string>("");
  const [selectedArrears, setSelectedArrears] = useState<string>("");
  
  // Get all unique classes and sections for filter dropdowns
  const classes = [...new Set(students.map(student => student.class))].sort();
  const sections = [...new Set(students.map(student => student.section))].sort();
  
  // Filter students based on selected filters
  const filteredStudents = students.filter(student => {
    // Search query filter (case-insensitive)
    const matchesSearch = searchQuery === "" || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Class filter
    const matchesClass = selectedClass === "" || student.class === selectedClass;
    
    // Section filter
    const matchesSection = selectedSection === "" || student.section === selectedSection;
    
    // Fees status filter
    const matchesFeesStatus = selectedFeesStatus === "" || student.feesStatus === selectedFeesStatus;
    
    // Arrears filter
    let matchesArrears = true;
    if (selectedArrears === "with") {
      matchesArrears = student.arrearsAmount > 0;
    } else if (selectedArrears === "without") {
      matchesArrears = student.arrearsAmount === 0;
    }
    
    return matchesSearch && matchesClass && matchesSection && matchesFeesStatus && matchesArrears;
  });
  
  // Reset all filters
  const handleReset = () => {
    setSearchQuery("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedFeesStatus("");
    setSelectedArrears("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Students</h1>
          <Button variant="default" className="bg-akkhor-yellow text-akkhor-blue hover:bg-akkhor-yellow/90">
            <Link to="/add-student" className="flex items-center">
              Add New Student
            </Link>
          </Button>
        </div>

        {/* Filters section */}
        <div className="bg-white p-4 rounded-md border border-border shadow-sm">
          <div className="flex items-center mb-4">
            <Filter className="mr-2 text-akkhor-blue" />
            <h2 className="text-lg font-medium">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search filter */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by ID, Name, Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Class filter */}
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Section filter */}
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sections">All Sections</SelectItem>
                {sections.map(section => (
                  <SelectItem key={section} value={section}>Section {section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Fees status filter */}
            <Select value={selectedFeesStatus} onValueChange={setSelectedFeesStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Arrears filter */}
            <Select value={selectedArrears} onValueChange={setSelectedArrears}>
              <SelectTrigger>
                <SelectValue placeholder="Arrears" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-arrears">All Students</SelectItem>
                <SelectItem value="with">With Arrears</SelectItem>
                <SelectItem value="without">No Arrears</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleReset} className="mr-2">
              Reset Filters
            </Button>
            <Button variant="default" className="bg-akkhor-blue text-white hover:bg-akkhor-blue/90">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Students table */}
        <div className="bg-white rounded-md border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Roll</TableHead>
                  <TableHead className="w-12">Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Parent's Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Fees Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} className="text-center py-8 text-muted-foreground">
                      No students found matching the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>#{student.id}</TableCell>
                      <TableCell>
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          <span className="text-xs font-medium">{student.name.charAt(0)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.parentName}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{student.dob}</TableCell>
                      <TableCell>{student.mobile}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.feesStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : student.feesStatus === 'Partial'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.feesStatus}
                          {student.arrearsAmount > 0 && ` ($${student.arrearsAmount})`}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-500">
                            <span className="sr-only">Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                            <span className="sr-only">Delete</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllStudents;
