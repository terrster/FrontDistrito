import React, { useEffect, useState } from "react";
import Title from "../Generic/Title";
import Carousel from "./Carousel";
import Allies from "./Allies";
import { Row, Col } from "react-bootstrap";
import banner_web from "../../assets/img/banner-allies/banner_web.jpg";
import banner_mobile from "../../assets/img/banner-allies/banner_mobile.jpg";
import bannerWeb from "../../assets/img/banner-allies/aliadosWeb.svg";
import linea from "../../assets/img/banner-allies/line_aliados nombre.svg";
import { Typography } from "@material-ui/core";

const images = [banner_web, banner_mobile];

const getSize = () => {
  const currentSize = document.getElementsByTagName("body")[0].clientWidth;
  return currentSize < 775 ? 1 : 0;
};

const OurAllies = () => {
  const [version, setVersion] = useState(getSize());
  const [versionImage, setVersionImage] = useState(0);

  useEffect(() => {
    setVersionImage(version);
  }, [version]);
  useEffect(() => {
    window.addEventListener("resize", () => setVersion(getSize()));
    return () => {
      window.removeEventListener("resize", () => setVersion(getSize()));
    };
  }, []);
  window.scrollTo(0, 0);
  return (
    <Row
      className="our-allies"
      style={{
        maxWidth: "100%",
        margin: "0",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* <Col
        xs={12}
        className="d-flex justify-content-center"
        style={{ position: "relative", margin: "0", padding: "0" }}
      >
        <img className="img-fluid" src={images[versionImage]} alt="WEB" />
      </Col> */}
      <Col
        xs={12}
        className="d-flex justify-content-center"
        style={{
          position: "relative",
          margin: "0",
          padding: "0",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        <img
          src={bannerWeb}
          alt="banner"
          className="img-fluid"
          style={{
            maxInlineSize: "100%",
            width: "100%",
            height: "auto",
            gridArea: "1/2",
          }}
        />
        <img
          src={linea}
          alt="linea"
          className="img-fluid"
          style={{ position: "absolute", top: "0", left: "0" }}
        />
        <div
          title="Aliados"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            gridArea: "1/2",
            zIndex: "2",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr",
            gridTemplateAreas: "uno dos text",
          }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="title-dp fz48  fw300 text-left lg2 card-header"
              id="header"
              style={{
                justifySelf: "center",
                alignSelf: "end",
                padding: "0 0 2rem 0",
              }}
            >
              <Typography
                style={{
                  color: "#fff",
                  fontFamily: "coolvetica_rg",
                  display: "flex",
                  fontSize: "2.2rem",
                }}
              >
                Aliados{" "}
                <Typography
                  style={{
                    color: "#023473",
                    fontFamily: "coolvetica_rg",
                    paddingLeft: "0.3rem",
                    fontSize: "2.2rem",
                  }}
                >
                  DP
                </Typography>
              </Typography>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default OurAllies;
