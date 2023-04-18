import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import bannerWeb from "../../assets/img/banner-allies/nuevaAliados.svg";
import bannerMob1 from "../../assets/img/banner-allies/nuevoAliadosMob1.svg";
import bannerMob2 from "../../assets/img/banner-allies/mobile_aliados.svg";
import linea from "../../assets/img/banner-allies/line_aliados nombre.svg";

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

  const Web = () => {
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
                className="title-dp fz48  fw300 text-left lg2 card-header alliesBottom"
                id="header"
                style={{
                  justifySelf: "center",
                  alignSelf: "end",
                }}
              >
                <span
                  className="textAllies"
                  style={{
                    color: "#fff",
                    display: "flex",
                  }}
                >
                  Aliados{" "}
                  <span
                    className="textAllies"
                    style={{
                      color: "#023473",
                      paddingLeft: "0.3rem",
                    }}
                  >
                    DP
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  const Mobile = () => {
    return (
      <Row
        className="flex-column"
        >
        <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{
            position: "relative",
            margin: "0",
            padding: "0",
          }}
        >
          <img
            src={bannerMob1}
            alt="banner"
            className="img-fluid"
            style={{
              maxInlineSize: "100%",
              width: "100%",
              height: "auto",
            }}
          />
          <div
                className="title-dp fz48  fw300 text-left lg2 card-header alliesBottom"
                id="header"
                style={{
                  position: "absolute",
                  top: "4%",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  zIndex: "2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <span
                  className="textAllies"
                  style={{
                    color: "#fff",
                    display: "flex",
                  }}
                >
                  Aliados{" "}
                  <span
                    className="textAllies"
                    style={{
                      color: "#023473",
                      paddingLeft: "0.3rem",
                    }}
                  >
                    DP
                  </span>
                </span>
              </div>
          </Col>
          <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{
            position: "relative",
            margin: "0",
            padding: "0",
          }}
        >
          <img
          src={bannerMob2}
          alt="banner"
          className="img-fluid"
          style={{
            maxInlineSize: "100%",
            width: "100%",
            height: "auto",
          }}
        />
        </Col>
        </Row>
    )
  };
  return (
    version === 0 ? (
      <Web />
    ) : (
      <Mobile />
    )
  )
};

export default OurAllies;
