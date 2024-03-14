import React, { useState } from 'react';
import './CoordinatePoint.css';
import { Tooltip, Link, tooltipClasses, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const CoordinatePoint = ({ one }) => {
  const baseUrl = "https://storeserver-uoax.onrender.com/";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const navigate = useNavigate()
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#eceae4',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      width: "130px",
      height: "100px",
      border: '1px solid #dadde9',
      borderRadius: "1px",
      display: 'grid',
      gridTemplateColumns: '1fr 5fr',
      position: "relative",
      left: "-25px",
      top: "-5px",
      transform: "translateX(-50%)",
    },
  }));

  const handleDetailClick = (index, product) => {
    setHoveredIndex(index);
    navigate(`/details/${product._id}`, { state: { product } });
  };

  return (
    <div style={{ position: 'relative', display: 'block', width: '100%', height: 'auto' }}>
      <img
        src={`${baseUrl}${one.routingToImage}`}
        alt={one.description}
        style={{
          zIndex: 1,
          width: '100%',
          height: 'auto',
        }}
        onLoad={(e) => {
          setImageWidth(e.target.naturalWidth);
          setImageHeight(e.target.naturalHeight);
        }}
      />
      {one.imageDetails.map((detail, index) => (
        <div style={{
          position: 'absolute',
          top: `${(detail.coordinatePoints.split(',')[1] * 95) / imageHeight}%`,
          left: `${(detail.coordinatePoints.split(',')[0] * 95) / imageWidth}%`,
        }}>
          <Link
            key={index}
            to={`/details/${detail.product._id}`}
            className={`outer-circle ${hoveredIndex === index ? 'outer-circle-hover' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => { handleDetailClick(index, detail.product);  e.stopPropagation() ; }}>
            <div className={`inner-circle ${hoveredIndex === index ? 'inner-circle-hover' : ''}`} />
            {hoveredIndex === index && (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <div style={{ cursor: 'pointer', marginTop: "-5px", display: 'flex', alignItems: 'center', borderRight: "2px solid rgb(186, 179, 179)", paddingRight: "8px", marginLeft: "-10px", width: "60%", height: "109.5%" }}>
                      <ArrowBackIosRoundedIcon />
                    </div>
                    <div style={{ paddingRight: "10px", width: "110px", direction: 'rtl' }}>
                      <h3 style={{ marginTop: 1 }}>{detail.product.name}</h3>
                      <p style={{ marginTop: -6 }}>{detail.product.description}</p>
                      <Typography variant='h5' style={{ marginTop: "25px" }}>₪{detail.product.price}</Typography>
                    </div>
                  </React.Fragment>
                }
              >
                <Button />
              </HtmlTooltip>

            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CoordinatePoint