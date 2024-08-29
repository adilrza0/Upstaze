import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { regions, skillsAndExpertise } from "@/utils/inputData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFindCoFounderMutation } from "@/redux/api/founderApiSlice";
import { useSelector } from "react-redux";

export default function FindCoFounder() {
  const [filters, setFilters] = useState({
    skills: [],
    experience:"",
    availibility:"",
    locations: [],
  });
  const {token} = useSelector((state)=>state.auth)
  const [findCofounders,{isLoading}]= useFindCoFounderMutation()
  const [cofounders,setCoFOunders] = useState([])

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : value,
    }));
  };
  const handleSubmit =async()=>{
    try {
        const result = await findCofounders({ filters, token }).unwrap();
        setCoFOunders(result)
        console.log(result);
        console.log(error);
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    handleSubmit()
    console.log(filters);
  }, [filters]);
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                <span>Filters</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div>
                  <Label htmlFor="skills" className="mb-2 block font-medium">
                    Skills or Expertise Needed
                  </Label>

                  <Select value="" id="skills">
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          filters.skills.length > 0
                            ? "Select skill or experitse"
                            : "Select skill or experitse"
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
                            <CommandEmpty>
                              No Skill or Expertise found.
                            </CommandEmpty>
                            {skillsAndExpertise.map((expertise, ind) => (
                              <CommandGroup key={ind} heading={expertise.type}>
                                {expertise.values.map((skills, index) => (
                                  <CommandItem
                                    value={skills}
                                    key={index}
                                    onSelect={() => {
                                      
                                      handleFilterChange("skills", skills);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        filters.skills.includes(skills)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {skills}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location" className="mb-2 block font-medium">
                    Preferred Co-Founder Location
                  </Label>

                  <Select>
                    <SelectTrigger className="w-full rounded-md border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                      <SelectValue placeholder="Select regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup heading="locations">
                              <CommandItem
                                onSelect={(e) => {
                                  // form.setValue("language", language)
                                  handleFilterChange("locations", e);
                                }}
                                value="local"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    filters.locations.includes("local")
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                Local
                              </CommandItem>
                              <CommandItem
                                onSelect={(e) => {
                                  // form.setValue("language", language)
                                  handleFilterChange("locations", e);
                                }}
                                value="remote"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    filters.locations.includes("remote")
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                Remote
                              </CommandItem>
                            </CommandGroup>
                            <CommandGroup heading="Specific Location">
                              {regions.map((region, index) => (
                                <CommandItem
                                  value={region}
                                  key={index}
                                  onSelect={(e) => {
                                    // form.setValue("language", language)
                                    handleFilterChange("locations", e);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      filters.locations.includes(region)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {region}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="Availibility"
                    className="mb-2 block font-medium"
                  >
                    Availibilty of Co-Founder
                  </Label>
                  <Select id="availibility"
                  onValueChange={(e)=>handleFilterChange("availibility",e)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Availibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Advisor">
                          Advisor
                        </SelectItem>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="experience-level"
                    className="mb-2 block font-medium"
                  >
                    Preferred Co-Founder Experience Level
                  </Label>
                  <Select id="experience-level"
                  onValueChange={(e)=>handleFilterChange("experience",e)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="early-career">
                          Early-career
                        </SelectItem>
                        <SelectItem value="mid-career">Mid-career</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                        <SelectItem value="no-preference">
                          No Preference
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="additional-preferences"
                    className="mb-2 block font-medium"
                  >
                    Additional Preferences (Optional)
                  </Label>
                  <Textarea
                    id="additional-preferences"
                    placeholder="Enter any additional preferences"
                    className="w-full rounded-md border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cofounders?.map((cofounder,ind)=>(
                <div className="rounded-md border bg-background p-4 shadow-md">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium">{cofounder.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {cofounder.industries.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <LocateIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                       {cofounder.city}, {cofounder.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ActivityIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {cofounder.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WorkflowIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {cofounder.skills.slice(0,3).join(", ")}
                      </span>
                    </div>
                  </div>
                  <Button className="mt-auto">Connect</Button>
                </div>
              </div>
            ))}
          
          
        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function WorkflowIcon(props) {
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
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}
