import ListingSlider from "../../components/customer/ListingSlider";
import CategorySlider from "../../components/customer/CategorySlider";
import { useListingsByCategory } from "../../hooks/useListingsByCategory";

function CustomerHome() {
  const { listingsByCategory, loading, error } = useListingsByCategory();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 mx-4">
        <div className="text-sm text-red-700">
          <div>Error loading listings:</div>
          <div className="overflow-ellipsis">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Slider */}
      <CategorySlider />

      {/* Newest Listings */}
      <ListingSlider
        items={listingsByCategory.newest}
        category="Newest Listings"
      />

      {/* Outdoor Gear Listings */}
      <ListingSlider
        items={listingsByCategory.outdoor}
        category="Outdoor Gear"
      />

      {/* Tools Listings */}
      <ListingSlider
        items={listingsByCategory.tools}
        category="Tools"
      />
    </div>
  );
}

export default CustomerHome