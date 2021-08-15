import React, { useEffect, useState } from "react";
import "./EmailModal.css";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export default function EmailModal({ ...props }) {
  const { show, onHide } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const url =
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
  function handleSubmit(values) {
    let payload = {
      name: values.name,
      email: values.email,
    };
    sendEmail(payload);
  }

  async function sendEmail(payload) {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
    } catch (err) {
      setError(err);
    }
    setLoading(false);
    setEmailSent(true);
  }

  const schema = yup.object().shape({
    name: yup.string().required("Let me know your name."),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter email."),
    emailCf: yup
      .string()
      .email("Please enter a valid email.")
      .required("You need to confirm the email.")
      .oneOf(
        [yup.ref("email"), null],
        "The email confirmation does not match."
      ),
  });
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        className="email-modal"
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "none",
            textAlign: "center",
            padding: "1.5rem 1.5rem",
          }}
        >
          <Modal.Title style={{ flexBasis: "100%" }}>
            <div className="title-text">
              {emailSent ? `All done!` : `Request an invite`}
            </div>
          </Modal.Title>
        </Modal.Header>
        {emailSent ? (
          <Modal.Body>
            <p style={{ marginBottom: 32 }}>
              You will be one of the first to experience Broccoli & Co. when we
              launch.
            </p>
            <Button
              onClick={onHide}
              style={{ width: "100%", border: "none", background: "#70A618" }}
            >
              OK
            </Button>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={async (values) => {
                await sleep(500);
                handleSubmit(values);
              }}
              initialValues={{
                name: "",
                email: "",
                emailCf: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      placeholder="Full Name"
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Email"
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="emailCf">
                    <Form.Control
                      type="email"
                      name="emailCf"
                      value={values.emailCf}
                      onChange={handleChange}
                      placeholder="Confirm Email"
                      isValid={touched.emailCf && !errors.emailCf}
                      isInvalid={!!errors.emailCf}
                      disabled={values.email.length > 0 ? false : true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emailCf}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {loading ? (
                    <Button
                      type="submit"
                      style={{
                        width: "100%",
                        background: "gray",
                        border: "none",
                      }}
                    >
                      Sending, please wait.
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      style={{
                        width: "100%",
                        background: "#70A618",
                        border: "none",
                      }}
                    >
                      Send
                    </Button>
                  )}
                  {error && <p>{error}</p>}
                </Form>
              )}
            </Formik>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
