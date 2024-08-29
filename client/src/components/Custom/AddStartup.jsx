import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { app } from "@/utils/firebase";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAddStartupMutation } from "@/redux/api/starupApiSlice";
import { useSelector } from "react-redux";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { industries } from "@/utils/inputData";

export default function AddStartUp() {
  const { register, handleSubmit, control } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);



  const [uploadedFileURLs, setUploadedFileURLs] = useState("");
  const [uploading,setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState();


  const [addStartUp,{isLoading}]=useAddStartupMutation()
  const {token} = useSelector((state)=>state.auth)

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      toast.warning("You can only selet 3 options");
    }
  };
  


  const SubmitHandler = async (data) => {
    data.industry = selectedOptions;
    setUploading(true);

        try {
          await uploadFile(data.logo[0]);
        } catch (error) {

          console.error("Error uploading file:", error.message);
          return;
        } finally {
          setUploading(false);
        }
        data.logo=uploadedFileURLs
        console.log(data)
        try {
          const result = await addStartUp({data,token})
          toast.success("StarUp Added")
        } catch (error) {
          console.log(error)
          toast.error('facing some issues from backend')
        }
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);

    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading");
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStatus(progress);
          console.log(`Upload of file is ${progress}% done`);
        },
        (error) => {
          console.log("first");
          reject(error);
        },
        () => {
          console.log("second");
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUploadedFileURLs(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };
  return (
    <div className="flex justify-center pb-12">
      <form action="" onSubmit={handleSubmit(SubmitHandler)}>
        <Card className="w-full max-w-4xl p-6 sm:p-8 md:p-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Create New Startup
            </CardTitle>
            <CardDescription>
              Fill out the form below to create a new startup on Founderio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    
                    {...register("name")}
                    id="name"
                    
                    placeholder="Enter your startup name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  {/* <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => ( */}
                  <Select
                    value=""
                    onValueChange={handleOptionSelect}
                    id="industry"
                    required
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedOptions.length > 0
                            ? "Select up to 3 industries"
                            : "Select up to 3 industries"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* {industries.map((ele, ind) => (
                          <SelectItem key={ind} value={ele}>
                            {ele}
                          </SelectItem>
                        ))} */}
                         <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No Industry found.</CommandEmpty>
                      <CommandGroup>
                        {industries.map((industry) => (
                          <CommandItem
                            value={industry}
                            key={industry}
                            onSelect={() => {
                              handleOptionSelect(industry)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedOptions.includes(industry)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {industry}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div>
                    {selectedOptions.map((option) => (
                      <div
                        key={option}
                        className="inline-flex items-center m-1 gap-2 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium text-primary-foreground"
                      >
                        {option}
                        <button
                          type="button"
                          className="hover:text-primary-foreground/80"
                          onClick={() => handleOptionSelect(option)}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* )} 
                  /> */}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("city")}
                    id="city"
                    required
                    placeholder="Enter your startup's city"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="what-offer">What do you offer?</Label>
                  <Textarea
                    {...register("whatOffer")}
                    id="what-offer"
                    rows={3}
                    placeholder="Describe your startup's offerings"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startup-vision">Startup Vision</Label>
                  <Input
                    id="startup-vision"
                    maxLength={160}
                    {...register("startupVision")}
                    placeholder="Describe your startup's vision (max 160 characters)"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    {...register("website")}
                    id="website"
                    type="url"
                    placeholder="Enter your startup's website URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Textarea
                    {...register("targetAudience")}
                    id="target-audience"
                    rows={3}
                    placeholder="Describe your startup's target audience"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenges">Challenges</Label>
                  <Textarea
                    {...register("challenges")}
                    id="challenges"
                    rows={3}
                    placeholder="Describe the challenges your startup is facing"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startup-story">Startup Story</Label>
                  <Textarea
                    {...register("startupStory")}
                    id="startup-story"
                    rows={3}
                    placeholder="Tell us the story of your startup"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="logo">Logo Upload</Label>
                  <Input
                    name="fileUpload"
                    accept=".jpg,.jpeg,.png,"
                    {...register("logo")}
                    id="logo"
                    type="file"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Create Startup
            </Button>
          </CardFooter>
          {uploading?
          <div className="flex flex-col items-center gap-2">
            Uploading image ...
            <div className="relative w-full max-w-md rounded-full bg-muted">
              <div
                className="absolute inset-0 flex items-center justify-center text-sm font-medium text-primary-foreground"
                aria-label="Progress: 75%"
              ></div>
              <div
                className="h-4 rounded-full bg-primary"
                style={{ width: `${uploadStatus}%` }}
              />
            </div>
          </div>
          :null
            }
        </Card>
      </form>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
