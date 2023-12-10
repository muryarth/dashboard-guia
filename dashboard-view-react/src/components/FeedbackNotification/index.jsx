import { Store } from "react-notifications-component";

const FeedbackNotification = ({
  title = "Wonderful!",
  message = "teodosii@react-notifications-component",
  type = "sucess",
  duration = 2000,
  location = "top",
}) => {
  return Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: location,
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true,
    },
  });
};

export default FeedbackNotification;
