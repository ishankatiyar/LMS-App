import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
// import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
    console.log("DF");
  const navigate = useNavigate();

  const [createCourse, {data , isLoading , error , isSuccess}] = useCreateCourseMutation();

  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    console.log(courseTitle);
    await createCourse({courseTitle, category});
  };

  // for displaying toast
  useEffect(() => {
    if(isSuccess) {
        toast.success(data?.message || "Radhey Radhey");
        navigate("/admin/course")
    }
  } , [isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add some spirituality into your life, Radhey Radhey !!!
        </h1>
        <p className="text-sm">Chant daily yaar!!!</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Naam Jaap"
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Radhey Radhey">Radhey Radhey</SelectItem>
                <SelectItem value="Jai Shree Krishna">
                  Jai Shree Krishna
                </SelectItem>
                <SelectItem value="Ram Ram">Ram Ram</SelectItem>
                <SelectItem value="Jai Siya Ram">Jai Siya Ram</SelectItem>
                <SelectItem value="RadhaKrishna">RadhaKrishna</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            {" "}
            Back{" "}
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Radhey Radhey
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>

        <div>
          <Label>Title</Label>
          <Input type="text" name="courseTitle" placeholder="Naam Jaap" />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
