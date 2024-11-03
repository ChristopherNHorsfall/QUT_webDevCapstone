import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import images from '../Assets/images';

const StyledCarouselImage = styled.img`
    width: 100%;
    height: 50vh;
    max-height: 50vh;
    object-fit: cover;
`;
const StyledCarouselCaption = styled.div`
    position: absolute; 
    bottom: 20px; 
    left: 50%;
    transform: translateX(-50%); 
    background-color: rgba(0, 0, 0, 0.6); 
    color: white;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
`;

const carouselData = [
    {
        image: images.koala,
        heading: "Welcome",
        caption: "Gain data-based insights into the tourism industry in your local area",
      },
      {
        image: images.seaRocks01,
        heading: "Sign In",
        caption: "To gain access to our visual reports on the tourism industry",
      },
      {
        image: images.beach01,
        heading: "A Local Approach",
        caption: "All reports are curated to focus on local government areas",
      },
      {
        image: images.bush01,
        heading: "Now and Then",
        caption: "View the current state of the local tourism industry and measure ongoing trends",
      }
]

function CarouselImage({ image, heading, caption }) {
    return (
        <Carousel.Item key={image}>
            <StyledCarouselImage src={image} alt={heading} />
            <StyledCarouselCaption>
                <h1>{heading}</h1>
                <p>{caption}</p>
            </StyledCarouselCaption>
        </Carousel.Item>
    );
    }



export default function WelcomeCarousel () {
    return (
        <Carousel interval={null} data-bs-theme="dark" className="d-none d-sm-block">
        {carouselData.map(CarouselImage)}
    </Carousel>
    );
}