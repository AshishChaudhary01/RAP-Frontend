export const handleImageError = (e) => {
  e.target.src = '/placeholder-image.jpg';
  e.target.onerror = null; // Prevent infinite loop
};

// Usage in ListingSlider:
<img
  src={item.image}
  alt={item.title}
  className="h-full w-full object-cover"
  onError={handleImageError}
/>