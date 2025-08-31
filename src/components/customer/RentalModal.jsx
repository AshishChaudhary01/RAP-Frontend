// src/components/customer/RentalModal.jsx
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useRental } from '../../contexts/RentalContext';

function RentalModal({ listing, isOpen, onClose, selectedDate }) {
  const [rentalDays, setRentalDays] = useState(1);
  const { createRental, loading } = useRental();

  const totalPrice = listing.price * rentalDays;
  const endDate = new Date(selectedDate);
  endDate.setDate(endDate.getDate() + rentalDays);

  const handleConfirmRental = async () => {
    try {
      const rentalData = {
        listingId: listing.id,
        ownerId: listing.ownerId, // Make sure this is passed from the listing
        listingTitle: listing.title,
        startDate: selectedDate,
        endDate: endDate.toISOString().split('T')[0],
        totalPrice,
        days: rentalDays,
      };

      await createRental(rentalData);
      onClose();
      alert('Rental request sent successfully!');
    } catch (error) {
      alert('Failed to create rental request: ' + error.message);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Confirm Rental Request
                </DialogTitle>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Duration (days)
                    </label>
                    <select
                      value={rentalDays}
                      onChange={(e) => setRentalDays(parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(days => (
                        <option key={days} value={days}>
                          {days} day{days > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Rental Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Daily rate:</span>
                        <span>Nrs. {listing.price}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start date:</span>
                        <span>{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End date:</span>
                        <span>{endDate.toLocaleDateString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>Nrs. {totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleConfirmRental}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Confirm Rental'}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default RentalModal;