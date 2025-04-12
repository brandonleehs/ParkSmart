export default function SearchResult({
  title,
  address,
  lat,
  lng,
  handleClick,
  x,
  y,
}) {
  return (
    <div
      data-latitude={lat}
      data-longitude={lng}
      data-x={x}
      data-y={y}
      className="flex cursor-pointer flex-col gap-0.5 border-b-1 border-b-gray-200 p-2 hover:bg-[#f8f9fa] active:bg-[#e9ecef] dark:border-b-gray-700 dark:hover:bg-gray-700 dark:active:bg-gray-600"
      onClick={handleClick}
    >
      <p className="text-start font-medium text-gray-700 dark:text-gray-200">
        {title}
      </p>
      <p className="text-start text-xs text-gray-600 dark:text-gray-400">
        {address}
      </p>
    </div>
  );
}
