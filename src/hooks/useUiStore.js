import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModalOpen, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModalOpen());
  };

  const toggleDateModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal();
  };

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
