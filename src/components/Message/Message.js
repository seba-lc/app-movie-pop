import { Alert } from "react-bootstrap";

const Message = ({children, variant, posit}) => {
  return (
    <Alert variant={variant} className={`text-center ${posit}`}>
      {children}
    </Alert>
  );
};

export default Message;