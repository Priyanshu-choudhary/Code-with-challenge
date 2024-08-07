import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '/src/dashBoard/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Groups2Icon from '@mui/icons-material/Groups2';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShareIcon from '@mui/icons-material/Share';
import LanguageIcon from '@mui/icons-material/Language';
import Footer2 from '../../home/Footer2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarsIcon from '@mui/icons-material/Stars';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '/src/ContestDetails.css';
import Rules from './Rules';
import CreateIcon from '@mui/icons-material/Create';
import { UserContext } from '/src/Context/UserContext';
import GettingStart from './GettingStart';
import { useNavigate, useLocation } from 'react-router-dom';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import GetStartButton from '../../Buttons/GetStart';
import BoxLoader from '../../Loader/BoxLoader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HtmlRenderer from '../../Leetcode/HtmlRenderer';

function ContestDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [contest, setContest] = useState(null);
    const { bg, light, dark, user, password, role } = useContext(UserContext);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFav, setisFav] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [heightRules, setheightRules] = useState("5%");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [views, setviews] = useState(0);
    useEffect(() => {
        setviews(Math.floor(Math.random() * (200 - 50)) + 50);
    }, [])

    const handleToggle = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    useEffect(() => {
        axios.get(`https://hytechlabs.online:9090/Contest/id/${id}`)
            .then(response => {
                setContest(response.data);
                if (response.data.registeredUser.includes(user)) {
                    setIsRegistered(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the contest details!', error);
            });
    }, [id, user]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
        isExpanded ? setheightRules("100%") : setheightRules("5%");
    };

    useEffect(() => {

        if (contest) {
            const contestDate = new Date(contest.date);
            const interval = setInterval(() => {
                const currentDate = new Date();
                const differenceInMilliseconds = contestDate - currentDate;

                if (differenceInMilliseconds <= 0) {
                    clearInterval(interval);
                    setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                } else {
                    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                    setTimeLeft({ days, hours, minutes });
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [contest]);

    if (!contest) {
        return <BoxLoader />;
    }

    const handleRegister = () => {
        if (!user) {
            alert("You need to log in to register.");
            return;
        }

        const registeredUser = Array.isArray(contest.registeredUser) ? contest.registeredUser : [];
        if (registeredUser.includes(user)) {
            alert("You are already registered.");
            return;
        }

        const updatedContest = {
            ...contest,
            registeredUser: [...registeredUser, user]
        };

        axios.put(`https://hytechlabs.online:9090/Contest/id/${id}`, updatedContest, {
            auth: {
                username: 'Contest',
                password: 'Contest'
            }
        })
            .then(response => {
                setContest(response.data);
                setIsRegistered(true);
                alert("Successfully registered!");
            })
            .catch(error => {
                console.error('There was an error updating the contest!', error);
            });
    };

    const handleShare = () => {
        const url = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: contest.nameOfContest,
                url: url
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL copied to clipboard!');
            }).catch(console.error);
        }
    };
    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Contest?')) {
            return;
        }

        const basicAuth = 'Basic ' + btoa(`Contest:Contest`);

        try {
            const response = await axios.delete(`https://hytechlabs.online:9090/Contest/id/${id}`, {
                headers: {
                    'Authorization': basicAuth
                }
            });

            if (response.status === 200) {
                alert("Contest deleted successfully.");
            } else {
                console.error('Error deleting Contest:', response);
            }
        } catch (error) {
            console.error('Error deleting Contest:', error);
        } finally {
            navigate('/contest');
        }
    };

    return (
        <div>
            <Dashboard />
            <img className="banner-image" src={contest.bannerImage} alt={contest.nameOfContest} />

            {role == "ADMIN" &&
                <div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 150, color: "black" }} >
                        <AddToPhotosIcon fontSize='large' onClick={() => { navigate(`/contestProblemsList`, { state: { contest } }); }} />
                    </div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 90, color: "black" }} >
                        <CreateIcon fontSize='large' onClick={() => { navigate(`/create-contest`, { state: { contestDetail: contest } }) }} />
                    </div>
                    <div className="button-86" style={{ position: "absolute", right: 10, top: 210, color: "black" }} >
                        <DeleteForeverIcon fontSize='large' onClick={() => { deleteUser(contest.id) }} />
                    </div>
                </div>
            }


            <div className="contest-header">
                <div className="contest-header-content">
                    <img className="logo" src={contest.logo} alt="logo" />
                    <h2>{contest.nameOfContest} | {contest.nameOfOrganization}</h2>

                    <div className="contest-details">
                        <div className="detail-item">
                            <CalendarMonthIcon />
                            <p>{new Date(contest.date).toLocaleDateString()}</p>
                        </div>
                        <div className="detail-item">
                            <HourglassTopIcon />
                            <p>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m </p>
                        </div>
                        <div className="detail-item">
                            <CategoryIcon />
                            <p>{contest.type}</p>
                        </div>

                    </div>
                </div>
            </div>
            {isRegistered &&
                <div>

                    <GettingStart days={timeLeft.days} hours={timeLeft.hours} minutes={timeLeft.minutes} isRegistered={isRegistered} contest={contest} />
                </div>}
            {isRegistered &&
                <div>
                    <GetStartButton value={"Show Result"} onClick={() => { navigate(`/ContestResults/findBy`, { state: { contest: contest } }) }} />
                </div>}
            <div className="content-section">
                <div className="contest-description3">
                    <h2>Detail</h2>
                    <HtmlRenderer htmlContent={contest.description} />

                </div>
                <div className="contest-info">
                    <div className="info-header">
                        <p className="fee"><strong><CurrencyRupeeIcon fontSize='large' />{contest.fee != null ? contest.fee : "Free"}</strong></p>

                        <button
                            className='RegisterButton'
                            style={{
                                fontSize: 22,
                                backgroundColor: isRegistered ? 'green' : '',
                                color: isRegistered ? 'white' : ''
                            }}
                            onClick={handleRegister}
                            disabled={isRegistered}
                        >
                            {isRegistered ? <div style={{ display: "flex" }}><CheckCircleIcon style={{ marginTop: 5, marginRight: 5 }} /> <p>Done!</p></div> : "Register"}
                        </button>

                        <div className='shareIcon' onClick={handleShare}><ShareIcon fontSize='large' /></div>
                        <div onClick={() => setisFav(!isFav)}>
                            {isFav ? <FavoriteBorderIcon fontSize='large' /> : <FavoriteIcon fontSize='large' />}
                        </div>
                    </div>
                    <p className="separator-gray"></p>
                    <div className="info-item">
                        <HowToRegIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Registration: {contest.registeredUser.length}</p>
                    </div>
                    <div className="info-item">
                        <VisibilityIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Views: {views}</p>
                    </div>
                    <div className="info-item">
                        <AccessAlarmsIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Duration: {contest.timeDuration} min </p>
                    </div>
                    <div className="info-item">
                        <Groups2Icon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Team Size: {contest.team.length}</p>
                    </div>
                    <div className="info-item">
                        <CategoryIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Category: {contest.type}</p>
                    </div>
                    <div className="info-item">
                        <LanguageIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                        <p>Link: {contest.link}</p>
                    </div>
                </div>
            </div>
            <div className="content-section">
                <div className="contest-description3">
                    <h2>Rounds</h2>
                    {contest.rounds.map((rule, index) => (
                        <div key={index} className="eligibility-item">
                            <li>{rule}</li>
                        </div>
                    ))}
                </div>
                <div className="eligibility-section">
                    <div className="eligibility-header">
                        <p className="eligibility"><strong><GppMaybeIcon fontSize='large' />Eligibility</strong></p>
                    </div>
                    <p className="separator-gray"></p>
                    {contest.eligibility.map((rule, index) => (
                        <div key={index} className="eligibility-item">
                            <WorkspacesIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                            <p>{rule}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="content-section">
                <div className="contest-description3" style={{ height: heightRules }}>
                    <h2>Rules</h2>
                    {contest.rules.map((rule, index) => (
                        <div key={index} className="eligibility-item">
                            <li>{rule}</li>
                        </div>
                    ))}
                    <Rules value={heightRules} />
                </div>
                <div className="eligibility-section2">
                    <div className="eligibility-header">
                        <p className="eligibility"><strong><EmojiEventsIcon fontSize='large' />Rewards</strong></p>
                    </div>
                    <p className="separator-gray"></p>
                    {contest.rewards.map((rule, index) => (
                        <div key={index} className="eligibility-item">
                            <StarsIcon fontSize='large' style={{ borderRadius: 5, borderWidth: 1.5, borderColor: "lightgray", marginRight: 10 }} />
                            <p>{rule}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="content-section2">
                <div className="contest-description2">
                    <h2>FAQ's</h2>
                    {contest.faq.map((rule, index) => (
                        <div key={index} className="faq-item">
                            <p className="separator-gray"></p>
                            <ul style={{ fontSize: 20 }} onClick={() => handleToggle(index)}>{rule}{expandedIndex === index ? <KeyboardArrowUpIcon fontSize='large' /> : <KeyboardArrowDownIcon fontSize='large' />}</ul>
                            {expandedIndex === index ? (
                                <>
                                    <div style={{ marginLeft: 30, fontWeight: "bold" }}>{contest.faqAnswer[index]}</div>
                                </>
                            ) : (<div className='eligibility-item'></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer2 />
        </div>
    );
}

export default ContestDetails;
