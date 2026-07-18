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
import { MapPin } from "lucide-react";

const reportSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Please enter a location"),
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
      location: "",
    },
  });

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      reset({
        category: "",
        title: "",
        description: "",
        location: "",
      });
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setFileError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, reset]);

  const categoryValue = watch("category");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit");
      return;
    }

    // Check file type
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

  const onSubmit = async (data: ReportFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Report submitted:", { ...data, image: selectedFile });
    reset();
    handleRemoveFile();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Report an Issue</DialogTitle>
          <DialogDescription>
            Help improve your community by reporting infrastructure problems.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2 min-w-0 w-full">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
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

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              Issue Title
            </label>
            <Input
              placeholder="e.g. Large pothole on Herbert Macaulay Way"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              Location
            </label>
            <div className="relative">
              <Input
                placeholder="e.g. Yaba, Lagos"
                className="pr-10"
                {...register("location")}
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            </div>
            {errors.location && (
              <p className="text-xs text-destructive">{errors.location.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
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
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              Attach Photo
            </label>
            {previewUrl ? (
              <div className="relative flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-2 pr-12 transition-all duration-300 animate-fade-in w-full min-w-0">
                <div className="relative size-12 overflow-hidden rounded-md border bg-white">
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-transparent"
                  onClick={handleRemoveFile}
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="sr-only">Remove photo</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  onClick={handleUploadClick}
                  className="flex-1 border border-dashed border-gray-300 bg-gray-50/50 rounded-md px-4 py-3 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group"
                >
                  <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
                    <svg className="size-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Upload Image
                  </p>
                </div>
                <p className="text-xs text-gray-400 max-w-[120px] leading-tight hidden sm:block">Max file size 5MB. Jpeg or PNG.</p>
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

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
