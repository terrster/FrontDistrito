import React, { useState, useEffect } from "react";
import Title from "../../Generic/Title";
import { Container } from "react-bootstrap";
import Marquee from "react-marquee-slider";
import { imgFinancial } from "../../../utils/Financials";
import { useHistory } from "react-router-dom";

import banner_web from "../../../assets/img/banner-allies/banner_web.jpg";
import banner_mobile from "../../../assets/img/banner-allies/banner_mobile.jpg";

const images = [banner_web, banner_mobile];

const AlliesLanding = (props) => {
  const history = useHistory();

  const [versionImage, setVersionImage] = useState(0);

  useEffect(() => {
    setVersionImage(props.estado);
  }, [props.estado]);

  const allies = imgFinancial("CARRUSEL");

  return (
    <div>
      <div>
        <img
          className="d-block w-100 bannerAllies"
          src={images[versionImage]}
          alt="WEB"
        />
      </div>
      <div
        className="title-dp"
        id="textAllies"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0"
        }}
      >
        <span
          className="textAllies"
          style={{
            color: "#F24C5A",
            display: "flex",
          }}
        >
          súper{" "}
          <span
            style={{
              color: "#023473",
              paddingLeft: "0.3rem",
            }}
          >
            partners
          </span>
        </span>
      </div>
      <Container className="container pb-3" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

      }}>
        {
          allies.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item}
                  alt="aliados"
                  style={{
                    width: "50%",
                    objectFit: "contain",
                  }}
                />
              </div>
            );

          })
        }
      </Container>
    </div>
  );
};

export default AlliesLanding;
