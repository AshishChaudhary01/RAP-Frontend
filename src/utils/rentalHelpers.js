export const rentalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const canCancelRental = (rental, currentUserId) => {
  return rental.renterId === currentUserId && rental.status === rentalStatus.PENDING;
};

export const canApproveRejectRental = (rental, currentUserId) => {
  return rental.ownerId === currentUserId && rental.status === rentalStatus.PENDING;
};

export const canCompleteRental = (rental, currentUserId) => {
  return rental.ownerId === currentUserId && rental.status === rentalStatus.APPROVED;
};

export const getStatusDisplay = (status) => {
  const statusMap = {
    [rentalStatus.PENDING]: { text: 'Pending', color: 'text-yellow-600 bg-yellow-100' },
    [rentalStatus.APPROVED]: { text: 'Approved', color: 'text-green-600 bg-green-100' },
    [rentalStatus.REJECTED]: { text: 'Rejected', color: 'text-red-600 bg-red-100' },
    [rentalStatus.COMPLETED]: { text: 'Completed', color: 'text-blue-600 bg-blue-100' },
    [rentalStatus.CANCELLED]: { text: 'Cancelled', color: 'text-gray-600 bg-gray-100' }
  };
  return statusMap[status] || { text: status, color: 'text-gray-600 bg-gray-100' };
};