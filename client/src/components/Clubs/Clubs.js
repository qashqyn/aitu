import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import ClubsImg from '../../images/clubs.png';
import ClubMusicImg from '../../images/club-music.png';
import ClubDanceImg from '../../images/club-dance.png';
import ClubReadingImg from '../../images/club-reading.jpg';
import ClubBasketballImg from '../../images/club-basketball.jpg';
import ClubVolleyballImg from '../../images/club-volleyball.jpg';
import ClubFootballImg from '../../images/club-football.png';
import ClubHydraImg from '../../images/club-hydra.jpg';
import ClubIntelectualImg from '../../images/club-intellectual.jpg';
import ClubEventImg from '../../images/club-event.jpg';
import ClubMediaImg from '../../images/club-media.jpg';
import ClubDebateImg from '../../images/club-debate.jpg';

import './styles.scss';

const clubs = [
    {name: 'Music Club', img: ClubMusicImg, link: 'https://www.instagram.com/aitu_music'},
    {name: 'Basketball Club', img: ClubBasketballImg, link: 'https://instagram.com/aitu_basketball'},
    {name: 'Football Club', img: ClubFootballImg, link: 'https://instagram.com/aitu_football'},
    {name: 'Dance Club', img: ClubDanceImg, link: 'https://instagram.com/aitudance'},
    {name: 'Reading Club', img: ClubReadingImg, link: 'https://instagram.com/aitu_reading'},
    {name: 'Hydra Organization', img: ClubHydraImg, link: 'https://instagram.com/aitu_hydra'},
    {name: 'Intellectuals Club', img: ClubIntelectualImg, link: 'https://instagram.com/aitu_intellectual'},
    {name: 'Media Club', img: ClubMediaImg, link: 'https://instagram.com/aitu_media'},
    {name: 'Event Club', img: ClubEventImg, link: 'https://instagram.com/eventclub_aitu'},
    {name: 'Volleyball club', img: ClubVolleyballImg, link: 'https://t.me/joinchat/L5ow1hWMzpFg8z-kKiYUnw'},
    {name: 'AITU Mafia', img: ClubDebateImg, link: 'https://instagram.com/aitu_mafia'},
    // {name: 'Phoenix', img: null, link: 'https://instagram.com/aitu_phoenix'},
    // {name: 'AITU Volunteers', img: null, link: 'https://instagram.com/aitu_volunteers'},
    // {name: 'AITU Jokers', img: null, link: 'https://instagram.com/aitu_jokers'},
    // {name: 'Galleryone AITU', img: null, link: 'https://instagram.com/aitu_artclub'},
    // {name: 'Demeu AITU', img: null, link: 'https://instagram.com/demeu.aitu'},
    // {name: 'Women Basketball Club', img: null, link: 'https://instagram.com/aitu_wbc'},
    // {name: 'Hydra Android Development Club', img: null, link: 'https://instagram.com/hydra_androiddev'},
    // {name: 'Debate Club', img: null, link: 'https://instagram.com/aitudebate'},
    // {name: 'Charity Club', img: null, link: 'https://instagram.com/_charity_club'},
    // {name: 'New Wave', img: null, link: 'https://t.me/joinchat/Hroz4xZvrZxQLOG97z64Fw'},
    // {name: 'Cybersport', img: null, link: 'https://t.me/joinchat/FUBM1BojDJ9p-5GL38A4-Q'},
    // {name: 'Math Analysis Club', img: null, link: 'https://t.me/joinchat/KH3iixbsfikzx-B_RqCUFQ'},
    // {name: 'Startup Club', img: null, link: 'https://t.me/joinchat/D82oyhQdeiK64MgJlBk3Tg'},
    // {name: 'Evergreen AITU', img: null, link: 'https://instagram.com/evergreen_aitu'},
    // {name: 'AITU Ace', img: null, link: 'https://instagram.com/aitu_ace'},
];

const Clubs = () => {

    return (
        <div id="clubs">
            <Container>
                <div id="clubs-top-img">
                    <Image src={ClubsImg} />
                    <h1>AITU CLUBS</h1>
                </div>
                <Row xs={1} md={2} className="club-cards">
                    {clubs.map((club, key) => (
                        <Col key={key}>
                            <a href={club.link} target="_blank">
                                <div className="club-card">
                                    <Image src={club.img} />
                                    <div className="club-card-title">
                                        <h3>{club.name}</h3>
                                    </div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
};

export default Clubs;