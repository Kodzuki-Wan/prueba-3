export const validateTimeSlot = (time) => {
  const validTimeSlots = ['09:00', '10:00', '11:00', '12:00'];
  return validTimeSlots.includes(time);
};