"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, BriefcaseIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import WardWiseMajorOccupationTable from "./_components/ward-wise-major-occupation-table";
import WardWiseMajorOccupationForm from "./_components/ward-wise-major-occupation-form";
import WardWiseMajorOccupationChart from "./_components/ward-wise-major-occupation-chart";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function WardWiseMajorOccupationPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const {
    data: occupationData,
    isLoading,
    isError,
  } = api.profile.demographics.wardWiseMajorOccupation.getAll.useQuery();

  const handleEdit = (id: string) => {
    setEditId(id);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditId(null);
  };

  if (isLoading) {
    return (
      <ContentLayout
        title="वडा अनुसार प्रमुख पेशा विवरण"
        subtitle="वडा अनुसार प्रमुख पेशा सम्बन्धी विवरण"
        icon={<BriefcaseIcon className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </ContentLayout>
    );
  }

  if (isError) {
    return (
      <ContentLayout
        title="वडा अनुसार प्रमुख पेशा विवरण"
        subtitle="वडा अनुसार प्रमुख पेशा सम्बन्धी विवरण"
        icon={<BriefcaseIcon className="h-6 w-6 text-primary" />}
      >
        <div className="text-center text-red-500 py-10">
          डाटा लोड गर्न समस्या भयो। कृपया पछि फेरि प्रयास गर्नुहोस्।
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      title="वडा अनुसार प्रमुख पेशा विवरण"
      subtitle="वडा अनुसार प्रमुख पेशा सम्बन्धी विवरण"
      icon={<BriefcaseIcon className="h-6 w-6 text-primary" />}
      actions={
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          नयाँ प्रमुख पेशा विवरण थप्नुहोस्
        </Button>
      }
    >
      <WardWiseMajorOccupationChart data={occupationData || []} />

      <WardWiseMajorOccupationTable
        data={occupationData || []}
        onEdit={handleEdit}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editId
                ? "प्रमुख पेशा विवरण सम्पादन"
                : "नयाँ प्रमुख पेशा विवरण थप्नुहोस्"}
            </DialogTitle>
          </DialogHeader>
          <WardWiseMajorOccupationForm
            editId={editId}
            onClose={handleFormClose}
            existingData={occupationData || []}
          />
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
}
