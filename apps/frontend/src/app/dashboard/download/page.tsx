'use client';

import { usePhotos } from '@/features/photos/hooks/use-photos';

export default function DownloadPhotosPage() {
  const { data: photos, isLoading } = usePhotos();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Download Photos</h1>
      <p className="text-muted-foreground mb-6">Page for downloading the enhanced photos.</p>
      
      <div className="grid gap-4">
        {photos?.map((photo: any) => (
          <div key={photo.id} className="border rounded p-4">
            <pre>{JSON.stringify(photo, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
