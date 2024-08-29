/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iN53l859iDV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";
import { industries, legalStructures, regions } from "@/utils/inputData";
import { Check, ChevronDown, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAddStartupMutation } from "@/redux/api/starupApiSlice";
import { useSelector } from "react-redux";
import { app } from "@/utils/firebase";
import { toast } from "sonner";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

export default function AddStart() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      logo: null,
      tagline: "",
      website: "",
      foundingDate: "",
    },
    industryAndMarket: {
      industry: "",
      marketSegment: "",
      targetAudience: "",
    },
    productService: {
      name: "",
      description: "",
      stage: "",
      usp: "",
    },
    businessModel: {
      model: "",
      revenueStreams: "",
    },
    financialInfo: {
      fundingStatus: "",
      totalRaised: "",
      keyInvestors: "",
      revenueMetrics: "",
    },
    team: {
      founders: "",
      keyMembers: "",
      advisoryBoard: "",
    },
    milestones: {
      keyMilestones: "",
      awards: "",
    },
    legal: {
      registrationNumber: "",
      legalStructure: "",
      ip: "",
    },
    needsAndGoals: {
      challenges: "",
      upstageGoals: "",
    },
    media: {
      pitchDeck: null,
      productDemo: null,
      additionalDocuments: null,
    },
    contact: {
      primaryContact: "",
      email: "",
      phone: "",
      location: "",
    },
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      toast.warning("You can only selet 3 options");
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const [uploadedFileURLs, setUploadedFileURLs] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState();

  const [addStartUp, { isLoading }] = useAddStartupMutation();
  const { token } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true);
    console.log(formData);
    try {
      await uploadFile(formData.basicInfo.logo);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return;
    } finally {
      setUploading(false);
    }
    formData.basicInfo.logo = uploadedFileURLs;
    formData.industryAndMarket.industry=selectedOptions
    console.log(formData);
    try {
      const result = await addStartUp({ data: formData, token });
      toast.success("StarUp Added");
    } catch (error) {
      console.log(error);
      toast.error("facing some issues from backend");
    }
  };
  const steps = [
    "Basic Info",
    "Industry & Market",
    "Product/Service",
    "Business Model",
    "Financial Info",
    "Team",
    "Milestones",
    "Legal",
    "Needs & Goals",
    "Media",
    "Contact",
  ];

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
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 md:p-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Startup Profile</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 ">
              {steps.map((step, index) => (
                <>
                  {" "}
                  <div
                    key={index}
                    className={`px-3 py-1  rounded-md text-sm font-medium ${
                      index === activeStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  <Separator orientation="horizontal" />
                </>
              ))}
            </div>
            {/* <div className="bg-muted rounded-full h-4 w-full relative">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div> */}
          </div>
          {activeStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">
                    Startup Name <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.basicInfo.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, name: e.target.value },
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    type="file"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          logo: e.target.files[0],
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.basicInfo.tagline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          tagline: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.basicInfo.website}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          website: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="foundingDate">
                    Founding Date<span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="foundingDate"
                    type="date"
                    value={formData.basicInfo.foundingDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          foundingDate: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="industry">
                  Industry <span className="text-red-500"> *</span>
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
                                  handleOptionSelect(industry);
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
              </div>
              <div>
                <Label htmlFor="marketSegment">Market Segment</Label>
                <Input
                  id="marketSegment"
                  value={formData.industryAndMarket.marketSegment}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      industryAndMarket: {
                        ...prev.industryAndMarket,
                        marketSegment: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  value={formData.industryAndMarket.targetAudience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      industryAndMarket: {
                        ...prev.industryAndMarket,
                        targetAudience: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="productName">
                  Product/Service Name <span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="productName"
                  value={formData.productService.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productService: {
                        ...prev.productService,
                        name: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="productDescription">
                  Description<span className="text-red-500"> *</span>
                </Label>
                <Textarea
                  id="productDescription"
                  value={formData.productService.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productService: {
                        ...prev.productService,
                        description: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="productStage">
                  Stage of Development<span className="text-red-500"> *</span>
                </Label>
                <Select
                  id="productStage"
                  value={formData.productService.stage}
                  required
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      productService: { ...prev.productService, stage: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea</SelectItem>
                    <SelectItem value="prototype">Prototype</SelectItem>
                    <SelectItem value="beta">Beta</SelectItem>
                    <SelectItem value="launched">Launched</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="usp">Unique Selling Proposition (USP)</Label>
                <Input
                  id="usp"
                  value={formData.productService.usp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productService: {
                        ...prev.productService,
                        usp: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessModel">
                  Business Model<span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="businessModel"
                  value={formData.businessModel.model}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessModel: {
                        ...prev.businessModel,
                        model: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="revenueStreams">Revenue Streams</Label>
                <Textarea
                  id="revenueStreams"
                  value={formData.businessModel.revenueStreams}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessModel: {
                        ...prev.businessModel,
                        revenueStreams: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fundingStatus">
                  Funding Status<span className="text-red-500"> *</span>
                </Label>
                <Select
                  id="fundingStatus"
                  value={formData.financialInfo.fundingStatus}
                  required
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      financialInfo: {
                        ...prev.financialInfo,
                        fundingStatus: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="series-c">Series C</SelectItem>
                    <SelectItem value="ipo">IPO</SelectItem>
                    <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="totalRaised">Total Raised</Label>
                <Input
                  id="totalRaised"
                  type="number"
                  value={formData.financialInfo.totalRaised}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      financialInfo: {
                        ...prev.financialInfo,
                        totalRaised: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="keyInvestors">Key Investors</Label>
                <Textarea
                  id="keyInvestors"
                  value={formData.financialInfo.keyInvestors}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      financialInfo: {
                        ...prev.financialInfo,
                        keyInvestors: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="revenueMetrics">Revenue Metrics</Label>
                <Textarea
                  id="revenueMetrics"
                  value={formData.financialInfo.revenueMetrics}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      financialInfo: {
                        ...prev.financialInfo,
                        revenueMetrics: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="founders">
                  Founders<span className="text-red-500"> *</span>
                </Label>
                <Textarea
                  id="founders"
                  value={formData.team.founders}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      team: { ...prev.team, founders: e.target.value },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="keyMembers">Key Members</Label>
                <Textarea
                  id="keyMembers"
                  value={formData.team.keyMembers}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      team: { ...prev.team, keyMembers: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="advisoryBoard">Advisory Board</Label>
                <Textarea
                  id="advisoryBoard"
                  value={formData.team.advisoryBoard}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      team: { ...prev.team, advisoryBoard: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="founders">
                  Key Milestones<span className="text-red-500"> *</span>
                </Label>
                <Textarea
                  id="founders"
                  value={formData.milestones.keyMilestones}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      milestones: {
                        ...prev.milestones,
                        keyMilestones: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="advisoryBoard">Awards and Recognitions</Label>
                <Textarea
                  id="advisoryBoard"
                  value={formData.milestones.awards}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      milestones: {
                        ...prev.milestones,
                        awards: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 7 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="founders">
                  Business Registration Number
                  <span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="registration"
                  value={formData.legal.registrationNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      legal: {
                        ...prev.legal,
                        registrationNumber: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="fundingStatus">Legal Structure</Label>
                <Select
                  id="legalStructue"
                  value={formData.legal.legalStructure}
                  required
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      legal: { ...prev.legal, legalStructure: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding status" />
                  </SelectTrigger>
                  <SelectContent>
                    {legalStructures.map((ele) => (
                      <SelectItem value={ele}>{ele}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="advisoryBoard">Intellectual Property</Label>
                <Input
                  id="advisoryBoard"
                  value={formData.legal.ip}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      legal: { ...prev.legal, ip: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 8 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="founders">
                  Current Challenges<span className="text-red-500"> *</span>
                </Label>
                <Textarea
                  id="challenges"
                  value={formData.needsAndGoals.challenges}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAndGoals: {
                        ...prev.needsAndGoals,
                        challenges: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="fundingStatus">
                  Goals for Upstaze<span className="text-red-500"> *</span>
                </Label>
                <Select
                  id="fundingStatus"
                  value={formData.needsAndGoals.upstageGoals}
                  required
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAndGoals: {
                        ...prev.needsAndGoals,
                        upstageGoals: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Networking">Networking</SelectItem>
                    <SelectItem value="Finding Mentors">
                      Finding Mentors
                    </SelectItem>
                    <SelectItem value=" Seeking Funding">
                      {" "}
                      Seeking Funding
                    </SelectItem>
                    <SelectItem value="For Support">For Support</SelectItem>
                    <SelectItem value="Find Job">Find Job</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {activeStep === 9 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pitch deck">
                  Pitch Deck<span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="pitch-deck"
                  placeholder="Provide link"
                  value={formData.media.pitchDeck}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      media: { ...prev.media, pitchDeck: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="productDemo">Product Demo</Label>
                <Input
                  id="productDemo"
                  value={formData.media.productDemo}
                  placeholder="Provide link"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      media: { ...prev.media, productDemo: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="productDocuments">Product Documents</Label>
                <Input
                  id="productDocuments"
                  value={formData.media.additionalDocuments}
                  placeholder="Provide link"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      media: {
                        ...prev.media,
                        additionalDocuments: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {activeStep === 10 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="primaryContact">
                  Primary Conatact<span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="primaryContact"
                  placeholder=" Name and role of the person"
                  value={formData.contact.primaryContact}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        primaryContact: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">
                  Email<span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="advisoryBoard">Phone</Label>
                <Input
                  id="advisoryBoard"
                  value={formData.contact.phone}
                  placeholder="Phone Number"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2 gap-6 ">
                <Label htmlFor="character">
                  Location <span className="text-red-500"> *</span>
                </Label>

                <Popover className="w-[100%]">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[100%] justify-between",
                        !formData.contact.location && "text-muted-foreground"
                      )}
                    >
                      {formData.contact.location
                        ? formData.contact.location
                        : "Select Location"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[100%] p-0">
                    <Command>
                      <CommandInput placeholder="Search locations" />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup heading="locations">
                          <CommandItem
                            onSelect={(e) => {
                              // form.setValue("language", language)
                              setFormData((prev) => ({
                                ...prev,
                                contact: { ...prev.contact, location: e },
                              }));
                            }}
                            value="local"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                "local" === formData.contact.location
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            Local
                          </CommandItem>
                          <CommandItem
                            onSelect={(e) => {
                              // form.setValue("language", language)
                              setFormData((prev) => ({
                                ...prev,
                                contact: { ...prev.contact, location: e },
                              }));
                            }}
                            value="remote"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                "remote" === formData.contact.location
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
                                setFormData((prev) => ({
                                  ...prev,
                                  contact: { ...prev.contact, location: e },
                                }));
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  region === formData.contact.location
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
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
