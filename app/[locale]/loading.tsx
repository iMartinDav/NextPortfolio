// Route-level fallback for client navigations. Kept deliberately quiet and
// delayed so fast transitions never flash a second "loader" after the intro.
export default function Loading() {
  return (
    <div
      role='status'
      aria-label='Loading'
      className='route-loading flex min-h-[calc(100vh-5rem)] w-full items-center justify-center'>
      <div className='h-1 w-48 overflow-hidden rounded-full bg-gray-800/30'>
        <div className='route-loading-bar h-full w-1/3 rounded-full bg-linear-to-r from-teal-400 via-cyan-500 to-teal-400' />
      </div>
    </div>
  );
}
