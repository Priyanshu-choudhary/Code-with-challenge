import React, { useEffect, useState, useContext } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import ProblemOfTheDay from './ProblemOfTheDay';
import './ProblemSet.css';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DataList from './DataList';
import Filter from './Filter';
import BoxLoader from '../Loader/BoxLoader';
import Skeleton from './Skeleton';
import Card from './Ads/CourseAds';
import ContestAds from './Ads/ContestAds';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function ProblemSet() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, settotalPages] = useState(10)
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [PODindex, setPODindex] = useState(0);
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const [filterObject, setFilterObject] = useState({
    topics: [],
    companies: [],
    difficulty: [],
    status: [],
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Posts/username/ProblemSet/posts?page=${page}&size=${size}`);
        const data = await response.json();
        let data2 = data.content;
        settotalPages(data.totalPages)
        setQuestions(data2);
        setFilteredQuestions(data2);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page]);

  // Apply search and filter whenever search query or filter object changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = questions;

      // Apply filters based on filterObject
      if (filterObject.topics.length > 0) {
        filtered = filtered.filter((question) =>
          question.tags?.some((topic) => filterObject.topics.includes(topic))
        );
      }
      if (filterObject.companies.length > 0) {
        filtered = filtered.filter((question) =>
          question.companies?.some((company) => filterObject.companies.includes(company))
        );
      }
      if (filterObject.difficulty.length > 0) {
        filtered = filtered.filter((question) =>
          filterObject.difficulty.includes(question.difficulty)
        );
      }
      if (filterObject.status.length > 0) {
        filtered = filtered.filter((question) =>
          filterObject.status.includes(question.status)
        );
      }

      // Apply search filter
      if (searchQuery.length >= 3) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((question) => {
          const titleMatch = question.title?.toLowerCase().includes(lowerCaseQuery);
          const tagMatch = question.tags?.join(', ').toLowerCase().includes(lowerCaseQuery);
          const companiesMatch = question.companies?.join(', ').toLowerCase().includes(lowerCaseQuery);
          return titleMatch || tagMatch || companiesMatch;
        });
      }

      setFilteredQuestions(filtered);
    };

    applyFilters();
  }, [filterObject, searchQuery, questions]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRandomClick = () => {
    let min = Math.ceil(0);
    let max = Math.floor(questions.length);
    let index = Math.floor(Math.random() * (max - min + 1)) + min;

    navigate(`/question/${questions[index].id}/ProblemSet`, {
      state: {
        problems: [questions[index]],
        currentIndex: 0,
        navHistory: "no def",
        currentPage: "no current page",
        CourseDescription: "description",
        totalProblems: 0,
        language: ["java"]
      }
    });
  };

  const handlePODClick = () => {
    navigate(`/question/${questions[PODindex].id}/ProblemSet`, {
      state: {
        problems: [questions[PODindex]],
        currentIndex: 0,
        navHistory: "no def",
        currentPage: "no current page",
        CourseDescription: "description",
        totalProblems: 0,
        language: ["java"]
      }
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);

    console.log("P " + page + " S " + size);

  };

  return (
    <div>
      <Dashboard />
      <div className="md:flex">
        {/* Sticky Section for Filters and Ads */}
        <div style={{ height: "100vh", position: "sticky", top: 0, overflowY: "auto" }}>
          <Filter setfilterObject={setFilterObject} />
          <ContestAds />
        </div>

        {/* Main Content */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProblemOfTheDay handlePODClick={handlePODClick} length={questions.length} setPODindex={setPODindex} Accuracy={80.4} Difficulty={"Medium"} />
          </div>

          <div className="pt-4 flex md:gap-14" style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <input
                type="text"
                className="custom-input"
                placeholder="Search Question"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-4">
              {role === "ADMIN" ? (
                <button onClick={() => { navigate('/UploadQuestion/ProblemSet') }}
                  className="rounded-3xl relative w-32 h-10 cursor-pointer flex items-center border border-green-400 bg-green-400 group hover:bg-green-400 active:bg-green-400 active:border-green-400"
                >
                  <span className="text-white font-semibold ml-8 transform group-hover:translate-x-1 transition-all duration-300">Add</span>
                  <span className="absolute right-0 h-full w-10 bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300 rounded-3xl">
                    <svg className="svg w-8 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="min-w-32"></div>
              )}
              <button onClick={handleRandomClick} style={{ borderRadius: 20 }} className="flex gap-2 border-2 border-gray-300 px-2 py-1.5 font-bold hover:bg-blue-200">
                <ShuffleIcon /> Random
              </button>
            </div>
          </div>

          <div className="mt-2" style={{ display: "flex", justifyContent: "center" }}>
            <div className="bg-blue-50 rounded-t-lg flex gap-5 space-x-4 py-3 px-2">
              <span style={{ minWidth: 250 }}>Title</span>
              <span>Difficulty</span>
              <span>Accuracy</span>
              <span>Action</span>
            </div>
          </div>

          <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            {loading ? (
              <div className="w-full">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <DataList
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  Difficulty={question.difficulty || "Unknown"}
                  Accuracy={question.accuracy}
                  problems={question}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              count={totalPages - 1}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>

        {/* Sticky Section for the Card */}
        <div style={{ height: "100vh", position: "sticky", top: 0, overflowY: "auto" }}>
          <Card />
        </div>
      </div>
    </div>

  );
}

export default ProblemSet;

