
// This is now a redirect component to the updated StudyHelpPage
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHelpPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/student/study-help');
  }, [navigate]);
  
  return null;
};

export default StudentHelpPage;
