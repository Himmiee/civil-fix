"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Map, CheckCircle2, Navigation } from "lucide-react";
import Link from "next/link";

const reportSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  title: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      category: "",
      title: "",
      description: "",
    },
  });

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        reset({
          category: "",
          title: "",
          description: "",
        });
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setFileError(null);
        setIsSubmitted(false);
        setLocationName(null);
        setIsLocating(false);
      }, 300);
    }
  }, [open, reset, previewUrl]);

  const categoryValue = watch("category");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFileError("Please select an image file (PNG, JPG)");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGetLocation = async () => {
    setIsLocating(true);
    // Simulate geolocation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setLocationName("Yaba, Lagos");
    setIsLocating(false);
  };

  const onSubmit = async (data: ReportFormData) => {
    if (!locationName) {
      // Simulate requiring location even if not in zod schema
      alert("Please select a location first");
      return;
    }
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Report submitted:", { ...data, location: locationName, image: selectedFile });
    setIsSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Report an Issue</DialogTitle>
              <DialogDescription>
                Help improve your community by reporting infrastructure problems.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2 min-w-0 w-full">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Issue Category
                </label>
                <Select
                  value={categoryValue}
                  onValueChange={(val) => setValue("category", val || "", { shouldValidate: true })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">Road Issues</SelectItem>
                    <SelectItem value="streetlight">Streetlight Problems</SelectItem>
                    <SelectItem value="drainage">Drainage Concerns</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-destructive">{errors.category.message}</p>
                )}
              </div>

              {/* Title (Optional) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Issue Title
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">OPTIONAL</span>
                </div>
                <Input
                  placeholder="e.g. Deep pothole on main road"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Location
                </label>
                
                {locationName ? (
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-slate-50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-slate-700">{locationName}</span>
                    </div>
                    <Button variant="link" size="sm" type="button" className="h-auto p-0 text-xs text-primary" onClick={() => setLocationName(null)}>
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 justify-start font-medium text-slate-600"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        "Locating..."
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2 text-primary" />
                          Use my current location
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" className="px-3" title="Search map">
                      <Map className="w-4 h-4 text-slate-500" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Description
                </label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description.message}</p>
                )}
              </div>

              {/* Photo upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Attach Photo
                </label>
                {previewUrl ? (
                  <div className="relative flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 pr-12 transition-all duration-300 animate-fade-in w-full min-w-0">
                    <div className="relative size-12 overflow-hidden rounded-md border bg-white">
                      <img
                        src={previewUrl}
                        alt="Upload preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-transparent"
                      onClick={handleRemoveFile}
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div
                      onClick={handleUploadClick}
                      className="flex-1 border border-dashed border-slate-300 bg-slate-50/50 rounded-md px-4 py-3 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                        <svg className="size-4 text-slate-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Upload Image
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 max-w-30 leading-tight hidden sm:block">Max file size 5MB. Jpeg or PNG.</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
                {fileError && (
                  <p className="text-xs text-destructive mt-1 font-medium">{fileError}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isSubmitting || !locationName}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Report Submitted!</h2>
            <p className="text-slate-500 mb-6 max-w-sm">
              Thank you for making your community better. Your report ID is <span className="font-mono font-bold text-slate-700">CFX-20481</span>.
            </p>
            
            <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
              <Button variant="outline" className="w-full border-slate-200 text-slate-700">
                Track Report
              </Button>
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-500">
                Close
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl w-full">
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Want to save your reports?</h4>
              <p className="text-xs text-blue-700/80 mb-3">Create a free account to track status and earn XP.</p>
              <Link href="/explore">
                <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 h-9 text-xs">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
