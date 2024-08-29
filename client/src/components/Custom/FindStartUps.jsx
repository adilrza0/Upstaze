import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BriefcaseIcon,
  ChevronDown,
  FilterIcon,
  MapPinIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { industries, regions } from "@/utils/inputData";
import { Check } from "lucide-react";
import { useFindStartupsMutation } from "@/redux/api/starupApiSlice";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

// Mock data for startups
const startups = [
  {
    id: 1,
    name: "HealthTech Innovators",
    industry: "Healthcare",
    stage: "Early-stage",
    location: "Remote",
    description: "Revolutionizing patient care through AI-driven diagnostics.",
  },
  {
    id: 2,
    name: "FinWise Solutions",
    industry: "Fintech",
    stage: "Growth-stage",
    location: "New York, USA",
    description: "Empowering small businesses with smart financial tools.",
  },
  {
    id: 3,
    name: "EcoShop",
    industry: "E-commerce",
    stage: "Early-stage",
    location: "Remote",
    description: "Sustainable and eco-friendly product marketplace.",
  },
  // Add more startup objects as needed
];

export default function FindStartup() {
  const { token } = useSelector((state) => state.auth);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [findstartups, { isLoading, error }] = useFindStartupsMutation();
  const [startups, setStartUps] = useState([]);
  const [filters, setFilters] = useState({
    industries: [],
    stages: [],
    locations: [],
    skills: [],
    availability: "",
    interest: "",
    fundingStatus: "",
  });

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

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      toast.warning("You can only selet 3 options");
    }
  };

  const handleSubmit = async () => {
    console.log("ashdf");
    try {
      const result = await findstartups({ data: filters, token }).unwrap();
      setStartUps(result);

      console.log(result);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(filters);
    handleSubmit();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <p className="text-xl text-muted-foreground">
          Discover exciting opportunities to be a co-founder
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter Startups
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Startups</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="industries">
                  Type of Startup Interested In
                </Label>
                <Select
                  value=""
                  onValueChange={handleOptionSelect}
                  id="industry"
                  required
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        filters.industries.length > 0
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
                            {industries.map((industry, index) => (
                              <CommandItem
                                value={industry}
                                key={index}
                                onSelect={() => {
                                  handleFilterChange("industries", industry);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    filters.industries.includes(industry)
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
                  {filters.industries.map((option) => (
                    <div
                      key={option}
                      className="inline-flex items-center m-1 gap-2 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium text-primary-foreground"
                    >
                      {option}
                      <button
                        type="button"
                        className="hover:text-primary-foreground/80"
                        onClick={() => handleFilterChange("industries", option)}
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stages">Startup Stage</Label>
                <Select value="" id="industry" required>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        filters.industries.length > 0
                          ? "Select stages"
                          : "Select stages"
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
                        <CommandInput placeholder="Search Stage..." />
                        <CommandList>
                          <CommandEmpty>No Stage found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="idea"
                             
                              onSelect={() => {
                                handleFilterChange("stages", "idea");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.stages.includes("idea")
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />Idea
                            </CommandItem>
                            <CommandItem
                              value="prototype"
                              
                              onSelect={() => {
                                handleFilterChange("stages", "prototype");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.stages.includes("prototype")
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />Prototype
                            </CommandItem>
                            <CommandItem
                              value="beta"
                              
                              onSelect={() => {
                                handleFilterChange("stages", "beta");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.stages.includes("beta")
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />Beta
                            </CommandItem>
                            <CommandItem
                              value="launched"
                              
                              onSelect={() => {
                                handleFilterChange("stages", "launched");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.stages.includes("launched")
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />Launched
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
              </div>
              <div className="space-y-2 gap-6 flex flex-col">
                <Label htmlFor="character">Location</Label>

                <Popover className="w-[100%]">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !filters.locations && "text-muted-foreground"
                      )}
                    >
                      {"Select Location"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
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
                  </PopoverContent>
                </Popover>
              </div>
              {/* <div className="grid gap-2">
                <Label>Skills or Expertise Offered</Label>
                <div className="flex flex-wrap gap-2">
                  {["Technical", "Marketing", "Finance", "Operations"].map((skill) => (
                    <Label key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.skills.includes(skill.toLowerCase())}
                        onCheckedChange={() => handleFilterChange("skills", skill.toLowerCase())}
                      />
                      <span>{skill}</span>
                    </Label>
                  ))}
                </div>
                <Input
                  placeholder="Other skills..."
                  onChange={(e) => handleFilterChange("skills", e.target.value)}
                />
              </div> */}

              <div className="grid gap-2">
                <Label htmlFor="availability">Availability</Label>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange("availability", value)
                  }
                  value={filters.availability}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="advisory">Advisory role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interest">
                  Why You're Interested (Optional)
                </Label>
                <Textarea
                  id="interest"
                  placeholder="Briefly explain your motivations..."
                  value={filters.interest}
                  onChange={(e) =>
                    handleFilterChange("interest", e.target.value)
                  }
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <p className="text-sm text-muted-foreground">
          {startups.length} startups found
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <Card key={startup._id}>
            <div className="w-[6vw] h-[6vw] p-3 border-2 rounded-xl m-3 border-muted">
              <img className="  " src={startup.basicInfo.logo} alt="" />
            </div>

            <CardHeader>
              <CardTitle>{startup.basicInfo.name}</CardTitle>
              <CardDescription>
                {startup.industryAndMarket.industry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{startup.productService.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BriefcaseIcon className="mr-1 h-4 w-4" />
                  {startup.productService.stage}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  {startup.contact.location}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
