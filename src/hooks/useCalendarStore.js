import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { calendarApi } from "../apis";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = convertEventsToDate(data.eventos);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");

      console.log(error);
    }
  };

  return {
    // Props
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
