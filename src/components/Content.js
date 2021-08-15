import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Content.css";
import EmailModal from "./EmailModal";
// import { useSendRequestInvite } from './redux/sendRequestInvite';

export default function Content() {
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  return (
    <div className="app-content">
      <div className="slogan">
        <h1>
          A better way <br /> to enjoy every day.
        </h1>
        <p>Be the first to know when we launch.</p>
        <div className="request">
          <Button
            style={{ background: "#70A618", border: "none" }}
            onClick={handleModalShow}
            variant="primary"
          >
            Request an invite
          </Button>
        </div>
      </div>

      <EmailModal show={modalShow} onHide={handleModalClose} />
    </div>
  );
}
