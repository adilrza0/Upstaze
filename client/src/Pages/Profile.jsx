"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAddFounderMutation } from "@/redux/api/founderApiSlice";
import { industries, regions, skillsAndExpertise } from "@/utils/inputData";
import { SelectGroup, SelectItem } from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { token } = useSelector((store) => store.auth);
  

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionClick = (option) => {
    console.log(option, selectedOptions);
    if (selectedOptions.includes(option)) {
      console.log(option, selectedOptions);
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      console.log(option);
    }
  };
  const navigate= useNavigate()

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const handleIndustrySelect = (option) => {
    if (selectedIndustries.includes(option)) {
      setSelectedIndustries(selectedIndustries.filter((o) => o !== option));
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, option]);
    } else {
      toast.warning("You can only selet 3 options");
    }
  };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const {user} =useSelector((state)=>state.auth)
  if(user.userId){
    navigate("/dashboard")
  }
  const handleSkillsSelect = (option) => {
    if (selectedSkills.includes(option)) {
      setSelectedSkills(selectedSkills.filter((o) => o !== option));
    } else if (selectedSkills.length < 8) {
      setSelectedSkills([...selectedSkills, option]);
    } else {
      toast.warning("You can only selet 8 options");
    }
  };

  const [activeSection, setActiveSection] = useState("basic");

  const [addProfile, { isLoading }] = useAddFounderMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const ava = watch();
  console.log(ava);

  const SubmitHandler = async (data) => {
    data.industries = selectedIndustries;
    data.why = selectedOptions;
    data.skills = selectedSkills;
    console.log(data);

    try {
      const result = await addProfile({ data, token });
      console.log(result.error)
      if(result.error)throw result.error
      toast.success("Profile updated");
      navigate("/dashboard");
      console.log(result);
    } catch (error) {
      toast.error(error?.data?.message||"someting wrong at server side")
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen w-full bg-muted">
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="flex-1 p-6 md:p-10"
      >
        {/* <ol className="flex items-center w-full">
          <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
          </li>
          <li className="flex items-center w-full">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
          </li>
        </ol> */}

        <div className="mx-auto max-w-3xl">
          {activeSection === "basic" && (
            <Collapsible className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Basic Profile</h2>
                <p className="text-muted-foreground">
                  Update your basic profile information.
                </p>
              </div>
              <div className="grid  gap-6 lg:grid-cols-2 sm:grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input {...register("dob")} id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("city")}
                    id="city"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slogan">Slogan/Motto</Label>
                  <Input
                    {...register("slogan")}
                    id="slogan"
                    placeholder="Enter your slogan or motto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vita">Bio (in short)</Label>
                  <Textarea
                    {...register("bio")}
                    id="bio"
                    placeholder="Enter your vita"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offering">I'm offering</Label>
                  <Textarea
                    {...register("offering")}
                    id="offering"
                    placeholder="What are you offering?"
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="why">Why are you here?</Label>
                  <Textarea
                    {...register("why")}
                    id="why"
                    placeholder="Why are you here?"
                  />
                </div> */}
              </div>
              <div className="grid gap-4 p-4 sm:p-6 md:p-8 ">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-2xl font-semibold">Why are you here?</h2>
                  <p className="text-muted-foreground">
                    Select the options that best describe your needs.
                  </p>
                </div>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                  <Card
                    className="p-4 flex flex-col items-center gap-4 relative cursor-pointer"
                    // onClick={() => handleOptionClick("join-project")}
                  >
                    <div className="bg-primary rounded-full p-3">
                      <RocketIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        Join a startup project
                      </h3>
                      <p className="text-muted-foreground">
                        An idea that already exists
                      </p>
                    </div>
                    <Checkbox
                      name="options"
                      id="join-project"
                      className="absolute top-4 right-4"
                      checked={selectedOptions.includes("join-project")}
                      onCheckedChange={() => handleOptionClick("join-project")}
                    />
                  </Card>
                  <Card
                    className="p-4 flex flex-col items-center gap-4 relative cursor-pointer"
                    // onClick={() => handleOptionClick("build-team")}
                  >
                    <div className="bg-primary rounded-full p-3">
                      <UsersIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Build up a team</h3>
                      <p className="text-muted-foreground">
                        For my idea / my project
                      </p>
                    </div>
                    <Checkbox
                      name="options"
                      id="build-team"
                      className="absolute top-4 right-4"
                      checked={selectedOptions.includes("build-team")}
                      onCheckedChange={() => handleOptionClick("build-team")}
                    />
                  </Card>
                  <Card
                    className="p-4 flex flex-col items-center gap-4 relative cursor-pointer"
                    // onClick={() => handleOptionClick("find-support")}
                  >
                    <div className="bg-primary rounded-full p-3">
                      <BriefcaseIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        Find external support
                      </h3>
                      <p className="text-muted-foreground">
                        For my project / my startup
                      </p>
                    </div>
                    <Checkbox
                      name="options"
                      id="find-support"
                      className="absolute top-4 right-4"
                      checked={selectedOptions.includes("find-support")}
                      onCheckedChange={() => handleOptionClick("find-support")}
                    />
                  </Card>
                  <Card
                    className="p-4 flex flex-col items-center gap-4 relative cursor-pointer"
                    // onClick={() => handleOptionClick("offer-support")}
                  >
                    <div className="bg-primary rounded-full p-3">
                      <HeartIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Offer support</h3>
                      <p className="text-muted-foreground">
                        To founders / startups
                      </p>
                    </div>
                    <Checkbox
                      name="options"
                      id="offer-support"
                      className="absolute top-4 right-4"
                      checked={selectedOptions.includes("offer-support")}
                      onCheckedChange={() => handleOptionClick("offer-support")}
                    />
                  </Card>
                </div>
              </div>

              <Button onClick={() => setActiveSection("team")}>Next</Button>
            </Collapsible>
          )}
          {activeSection === "team" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Team Profile</h2>
                <p className="text-muted-foreground">
                  Update your team profile information.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="motivation">Motivation</Label>
                  <Textarea
                    {...register("motivation")}
                    id="motivation"
                    placeholder="What motivates you?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievement">Achievement</Label>
                  <Textarea
                    {...register("achievement")}
                    id="achievement"
                    placeholder="What have you achieved?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="character">Character Traits</Label>
                  <Textarea
                    {...register("character")}
                    id="character"
                    placeholder="Describe your character traits"
                  />
                </div>
                <div className="space-y-2 gap-6 flex flex-col">
                  <Label htmlFor="character">Location</Label>
                  <Controller
                    name="location"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Popover className="w-[50%]">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : "Select Location"}
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
                                    field.onChange(e);
                                  }}
                                  value="local"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      "local" === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Local
                                </CommandItem>
                                <CommandItem
                                  onSelect={(e) => {
                                    // form.setValue("language", language)
                                    field.onChange(e);
                                  }}
                                  value="remote"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      "remote" === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Remote
                                </CommandItem>
                              </CommandGroup>
                              <CommandGroup heading="Specific Location">
                                {regions.map((region) => (
                                  <CommandItem
                                    value={region}
                                    onSelect={(e) => {
                                      // form.setValue("language", language)
                                      field.onChange(e);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        region === field.value
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
                    )}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Textarea
                    {...register("interests")}
                    id="interests"
                    placeholder="What are your interests?"
                  />
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="position">Team Position</Label>
                  <Input
                    {...register("position")}
                    id="position"
                    placeholder="Enter your team position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Controller
                    name="experience"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        onValueChange={(e) => {
                          e != "" ? field.onChange(e) : null;
                        }}
                        id="experience"
                        required
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              field.value ? field.value : "Select experience"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="early career">
                              Early Career
                            </SelectItem>
                            <SelectItem value="mid career">
                              Mid Career
                            </SelectItem>
                            <SelectItem value="experienced">
                              {" "}
                              Experienced
                            </SelectItem>
                            <SelectItem value="no prefrence">
                              {" "}
                              No Preference
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Textarea
                    {...register("role")}
                    id="role"
                    placeholder="Describe your role"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <br />
                  <Controller
                    name="skills"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Popover className="w-[40vw]">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[100%] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : "Select Skills or Expertise"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[100%] p-0">
                          <Command>
                            <CommandInput placeholder="Search skills and experitse" />
                            <CommandList>
                              <CommandEmpty>No Skill or Expertise found.</CommandEmpty>
                              {skillsAndExpertise.map((experties) => (
                                <CommandGroup heading={experties.type}>
                                  {experties.values.map((skills) => (
                                    <CommandItem
                                      value={skills}
                                      onSelect={(e) => {
                                        // form.setValue("language", language)
                                        handleSkillsSelect(e);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          skills === field.value
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
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  <div>
                    {selectedSkills.map((option) => (
                      <div
                        key={option}
                        className="inline-flex items-center m-1 gap-2 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium text-primary-foreground"
                      >
                        {option}
                        <button
                          type="button"
                          className="hover:text-primary-foreground/80"
                          onClick={() => handleSkillsSelect(option)}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {/* )} 
                  /> */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Current Occupation</Label>
                  <Input
                    {...register("occupation")}
                    id="occupation"
                    placeholder="Enter your current occupation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>

                  <Controller
                    name="availibility"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        onValueChange={(e) => {
                          e != "" ? field.onChange(e) : null;
                        }}
                        id="availibilty"
                        required
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              field.value ? field.value : "Select Availibility"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Advisor">Advisor</SelectItem>
                          <SelectItem value="Part Time">Part Time</SelectItem>
                          <SelectItem value="Full Time">Full Time</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">
                    Interested StartUp Industries
                  </Label>

                  <Select
                    value=""
                    onValueChange={handleIndustrySelect}
                    id="industry"
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedIndustries.length > 0
                            ? "Select up to 3 industries"
                            : "Select up to 3 industries"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <Command>
                        <CommandInput placeholder="Search Industries..." />
                        <CommandList>
                          <CommandEmpty>No Industry found.</CommandEmpty>
                          <CommandGroup>
                            {industries.map((industry) => (
                              <CommandItem
                                value={industry}
                                key={industry}
                                onSelect={() => {
                                  handleIndustrySelect(industry);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedIndustries.includes(industry)
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
                    </SelectContent>
                  </Select>
                  <div>
                    {selectedIndustries.map((option) => (
                      <div
                        key={option}
                        className="inline-flex items-center m-1 gap-2 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium text-primary-foreground"
                      >
                        {option}
                        <button
                          type="button"
                          className="hover:text-primary-foreground/80"
                          onClick={() => handleIndustrySelect(option)}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {/* )} 
                  /> */}
                  </div>
                </div>

                {/* <div className="grid gap-2">
                  <Label htmlFor="what-offer">What do you offer?</Label>
                  <Textarea
                    {...register("whatOffer")}
                    id="what-offer"
                    rows={3}
                    placeholder="Describe your startup's offerings"
                  />
                </div> */}
                {/* <div className="grid gap-2">
                  <Label htmlFor="startup-vision">Startup Vision</Label>
                  <Input
                    id="startup-vision"
                    maxLength={160}
                    {...register("startupVision")}
                    placeholder="Describe your startup's vision (max 160 characters)"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="strengths">Team Strengths</Label>
                  <Textarea
                    {...register("strengths")}
                    id="strengths"
                    placeholder="Describe your team's strengths"
                  />
                </div>
              </div>
              <Button
                className="mr-5"
                onClick={() => setActiveSection("basic")}
              >
                Previous
              </Button>
              <Button onClick={() => setActiveSection("links")}>Next</Button>
            </div>
          )}
          {activeSection === "links" && (
            <Collapsible className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Links</h2>
                <p className="text-muted-foreground">
                  Add your social media and other links.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    {...register("linkedin")}
                    id="linkedin"
                    placeholder="Enter your LinkedIn profile URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    {...register("twitter")}
                    id="twitter"
                    placeholder="Enter your Twitter profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    {...register("facebook")}
                    id="facebook"
                    placeholder="Enter your Facebook profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    {...register("youtube")}
                    id="youtube"
                    placeholder="Enter your YouTube channel URL"
                  />
                </div>
              </div>
              <Button className="mr-5" onClick={() => setActiveSection("team")}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </Collapsible>
          )}
        </div>
      </form>
    </div>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
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

{
  /* <aside className="hidden w-64 shrink-0 border-r bg-background p-6 md:block">
        <div className="space-y-6">
          <nav className="space-y-1">
            <Button
              variant={activeSection === "basic" ? "secondary" : "ghost"}
              onClick={() => setActiveSection("basic")}
              className="w-full justify-start"
            >
              Basic Profile
            </Button>
            <Button
              variant={activeSection === "team" ? "secondary" : "ghost"}
              onClick={() => setActiveSection("team")}
              className="w-full justify-start"
            >
              Team Profile
            </Button>
            <Button
              variant={activeSection === "links" ? "secondary" : "ghost"}
              onClick={() => setActiveSection("links")}
              className="w-full justify-start"
            >
              Social
            </Button>
            <Button
              variant={activeSection === "settings" ? "secondary" : "ghost"}
              onClick={() => setActiveSection("settings")}
              className="w-full justify-start"
            >
              Account Settings
            </Button>
          </nav>
        </div>
      </aside> */
}
