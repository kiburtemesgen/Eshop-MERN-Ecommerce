import React from "react";

const Footer = () => {
  return (
    <div className="mt-5 py-3 bg-black">
      <section className="">
        <footer className="bg-black text-center text-white">
          <div className="container p-4 pb-0">
            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <button
                  type="button"
                  className="btn btn-outline-light btn-rounded"
                >
                  Sign up!
                </button>
              </p>
             <div className="py-3 my-3">
             <a
                className="btn btn-primary btn-floating m-1"
                style={{backgroundColor: "#3b5998"}}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                className="btn btn-primary btn-floating m-1"
                style={{backgroundColor: "#55acee"}}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                className="btn btn-primary btn-floating m-1"
                style={{backgroundColor: "#dd4b39"}}
                href="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              <a
                className="btn btn-primary btn-floating m-1"
                style={{backgroundColor: "#ac2bac"}}
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
             </div>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2022 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              Eshop
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Footer;
