import { calendar } from '../config/calendar.js';
import { validateTimeSlot } from '../utils/validation.js';

export const createAppointment = async (req, res) => {
  try {
    const { date, time, name, email } = req.body;

    if (!validateTimeSlot(time)) {
      return res.status(400).json({ error: 'Invalid time slot' });
    }

    const [hours, minutes] = time.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const event = {
      summary: `Consulta con ${name}`,
      description: `Cita agendada por ${email}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Mexico_City',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Mexico_City',
      },
      attendees: [{ email }],
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
    });

    res.json({
      success: true,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};