import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Loading from '../style/Loading';
import ErrorPage from '../ErrorPage';
import HistoryForm from './HistoryForm';

const TakeHistory = () => {
    const { id, code } = useParams(); // Get id and code from URL
    const [visitData, setVisitData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchVisitData = async () => {
            try {
                const response = await fetch(`http://localhost:8567/api/visits/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.uniqueIdentifier === code) {
                    setVisitData(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitData();
    }, [id, code]);

    const inputs = [
        { id: 1, label: 'Diagnosis', type: 'text', placeholder: 'Diagnosis' },
        // ... more inputs
    ];
    const title = 'Your Title';

    if (loading) {
        return (
        <Loader>
          <Loading/>
        </Loader>
        ); // Render loading component while data is being fetched
    }

    if (error) {
        return <ErrorPage/>; // Render error page if there's an error
    }

    return (
        <Wrapper>
            <div className='container'>
                {visitData && <HistoryForm inputs={inputs} title={title} visitData={visitData} />}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: "#FFFFFF";
`;

const Loader = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: "#FFFFFF";
`;


export default TakeHistory;
