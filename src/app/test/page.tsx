import { dump } from "@/backend/helper/debug";
import { fetchAllLabels } from "@/backend/services/labels";
import { fetchAllProducts } from "@/backend/services/products";
import { getSettingsData } from "@/backend/services/settings";



export default async function TestPage() {

  return (
    <>
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold underline">Test Page</h1>
        <p className="mt-4">
          This is a test page o verify the setup of the application.
        </p>
        <p className="mt-2">You can add more content here as needed.</p>
      </div>
    </>
  );
}
