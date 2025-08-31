import { Link } from 'react-router';
import { HiOutlineChevronRight } from 'react-icons/hi';

function ListingSlider({ items, category }) {
  // Transform API data to match your component's expected format
  const transformedItems = items.map(item => ({
    id: item.id,
    title: item.title,
    rent: `Nrs. ${item.price}/${item.priceUnit}`,
    location: item.location,
    image: item.images?.[0] || '/placeholder-image.jpg'
  }));

  return (
    <div className="max-w-7xl mx-auto px-0 pt-6 lg:px-8">
      <h2 className="text-lg font-semibold mb-0">{category}</h2>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex gap-4 overflow-x-auto px-0 py-4
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {transformedItems.map((item) => (
              <Link
                key={item.id}
                to={`/customer/listings/${item.id}`}
                className="flex-shrink-0 w-28 md:w-40 lg:w-48 hover:scale-103 transition-transform duration-500"
              >
                {/* Image container with 1:1 aspect ratio */}
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                  <p className="text-indigo-600 font-semibold text-sm">{item.rent}</p>
                  <h3 className="text-gray-900 font-medium truncate">{item.title}</h3>
                  <p className="text-gray-500 text-sm truncate">{item.location}</p>
                </div>
              </Link>
            ))}

            {/* More option card - only show if there are items */}
            {transformedItems.length > 0 && (
              <div className="flex-shrink-0 w-28 md:w-40 lg:w-48 flex flex-col items-center justify-center rounded-lg bg-gray-100 shadow hover:bg-gray-200 cursor-pointer">
                <HiOutlineChevronRight className="h-6 w-6 text-gray-600" />
                <span className="mt-2 text-gray-700 font-medium text-sm">More</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingSlider;