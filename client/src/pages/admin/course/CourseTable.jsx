import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


const CourseTable = () => {
   
  const navigate = useNavigate();

  // const
  const {data, isLoading} = useGetCreatorCourseQuery();

  if(isLoading) return <h1> "Please wait bhai ...!!!"</h1>

  console.log("data ->", data);

  console.log("I reached here");

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>
        {" "}
        Take a step towards salvation!!!{" "}
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.coursePrice || "NA" }</TableCell>
              <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button size='sm' variant = 'ghost' onClick={() => navigate(`${course._id}`)}><Edit2/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </div>
  );
};

export default CourseTable;
